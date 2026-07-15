const ai = require('../services/gemini')
const ClothingItem = require('../models/ClothingItem')

async function handleAiSuggestion(req,res) {
    try{
        const missingCategories =[];
        if(!req.body.top){
            missingCategories.push("top");
        }
        if(!req.body.bottom){
            missingCategories.push("bottom");
        }
        if(!req.body.shoes){
            missingCategories.push("shoes");
        }
        if(!req.body.accessory){
            missingCategories.push("accessory");
        }

        const availableItems = await ClothingItem.find({
            category: { $in: missingCategories}
        })

        const wardrobeText = availableItems.map((item)=>`
        Name: ${item.name}
        Category: ${item.category}
        Color: ${item.color}
        Style: ${item.style}
        Season: ${item.season}
        Occasion: ${item.occasion}
        `).join("\n")

        const prompt = `
            You are an expert fashion stylist specializing in women's editorial fashion.

            The user has already selected these items for their outfit:
            ${filledDescription || "Nothing selected yet — suggest a complete starting look."}

            Your task is to suggest ONE item for each of these missing slots: ${missingCategories.join(', ')}

            Guidelines:
            - Match colors that complement the existing items
            - Match the formality level (casual with casual, formal with formal)
            - Consider the season and occasion of existing items
            - Prioritize harmony and cohesion over individual statement pieces

            Available wardrobe items by category:
            ${JSON.stringify(grouped, null, 2)}

            Return ONLY a valid JSON object with the missing slot names as keys and the item's "id" field as the value.
            Do not include filled slots. Do not include markdown. Do not include explanations.

            Example format if bottom and shoes are missing:
            {"bottom": "wb003", "shoes": "ws001"}`
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents:prompt,
        });
        let suggestions;
        try{
            suggestions = JSON.parse(response.text)
        }catch(err){
            return res.status(500).json({message: "Invalif JSON returned by AI"})
        }
        const recommendedItems = {};
        if(suggestions.shoes){
            recommendedItems.shoes = await ClothingItem.findOne({
                name: suggestions.shoes
            })
        }
        if(suggestions.accessory){
            recommendedItems.accessory = await ClothingItem.findOne({
                name: suggestions.accessory
            });
        }
        return res.json(recommendedItems)
    }catch(err){
        if(err.status === 429){
            return res.status(429).json({
                message: "AI Stylist is temporarily busy. Please try again in a few seconds."
            });
        }

        return res.status(500).json({
            message:"Something went wrong."
        });
    }
}

module.exports = {
    handleAiSuggestion
}