const ai = require('../services/gemini')
const ClothingItem = require('../models/ClothingItem')

async function handleAiSuggestion(req, res) {
    try {
        const { top, bottom, shoes, accessory } = req.body

        // Identify which slots need suggestions
        const missingSlots = []
        if (!top) missingSlots.push("top")
        if (!bottom) missingSlots.push("bottom")
        if (!shoes) missingSlots.push("shoes")
        if (!accessory) missingSlots.push("accessory")

        if (missingSlots.length === 0) {
            return res.status(400).json({ message: "All slots are already filled." })
        }

        // Fetch available items only for missing categories
        const availableItems = await ClothingItem.find({
            category: { $in: missingSlots }
        })

        // Group by category for the prompt
        const grouped = {}
        missingSlots.forEach(slot => {
            grouped[slot] = availableItems
                .filter(item => item.category === slot)
                .map(item => ({
                    id: item.id,
                    name: item.name,
                    color: item.color,
                    style: item.style.join(', '),
                    occasion: item.occasion.join(', '),
                    season: item.season.join(', '),
                    formality: item.formality
                }))
        })

        const filledDescription = [
            top ? `Top: ${top.name}, Color: ${top.color}, Style: ${top.style?.join(', ')}, Occasion: ${top.occasion?.join(', ')}` : null,
            bottom ? `Bottom: ${bottom.name}, Color: ${bottom.color}, Style: ${bottom.style?.join(', ')}` : null,
            shoes ? `Shoes: ${shoes.name}, Color: ${shoes.color}` : null,
            accessory ? `Accessory: ${accessory.name}, Color: ${accessory.color}` : null,
        ].filter(Boolean).join('\n')

        const prompt = `
            You are an expert fashion stylist specializing in women's editorial fashion.

            The user has already selected these items for their outfit:
            ${filledDescription || "Nothing selected yet — suggest a complete starting look."}

            Your task is to suggest ONE item for each of these missing slots: ${missingSlots.join(', ')}

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
            {"bottom": "wb003", "shoes": "ws001"}
            `

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
        })

        const rawText = response.text.replace(/```json|```/g, '').trim()

        let suggestions
        try {
            suggestions = JSON.parse(rawText)
        } catch (err) {
            return res.status(500).json({ message: "AI returned an unexpected response. Please try again." })
        }

        // Fetch full item objects using custom id
        const recommendedItems = {}
        for (const [slot, itemId] of Object.entries(suggestions)) {
            if (itemId && missingSlots.includes(slot)) {
                const item = await ClothingItem.findOne({ id: itemId })
                if (item) recommendedItems[slot] = item
            }
        }

        return res.status(200).json(recommendedItems)

    } catch (err) {
        if (err.status === 429) {
            return res.status(429).json({
                message: "AI Stylist is temporarily busy. Please try again in a few seconds."
            })
        }
        return res.status(500).json({ message: err.message })
    }
}

module.exports = { handleAiSuggestion }