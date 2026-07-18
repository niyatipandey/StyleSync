import React from 'react'
import { Link } from 'react-router-dom';
import { motion, useInView } from "framer-motion";
import girlImg from "../../assets/LANDING_PAGE_GIRL.png";
import aiBoxImg from "../../assets/LANDING_PAGE_AI_BOX.png";

const Hero = ({C,serif,sans}) => {
    return (
    <section className="relative min-h-[88vh] overflow-hidden bg-[#F8F5F0]">

      <div className="absolute inset-0">
        <img
          src={girlImg}
          className="h-full w-full object-cover object-[75%_top] lg:object-[40%_top]"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right,#F8F5F0 0%,rgba(248,245,240,.82) 30%,rgba(248,245,240,.33) 55%,transparent 75%)",
          }}
        />

        <div
          className="absolute bottom-0 left-0 right-0 h-[30%]"
          style={{
            background:
              "linear-gradient(to top,#F8F5F0,transparent)",
          }}
        />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[70vh] items-start lg:items-center max-w-7xl px-6 pt-20 pb-12 lg:px-8 lg:min-h-[88vh]">

            <div className="max-w-xl">

            <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .5, delay: .05 }}
                className="mb-5 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#B88A2A]"
            >
                AI Stylist. Your Look, Perfected.
            </motion.p>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .6, delay: .12 }}
                className="font-serif font-bold leading-tight text-[#2E2621] text-4xl sm:text-5xl md:text-6xl"
            >
                Build Your
                <br />
                Wardrobe.
            </motion.h1>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .6, delay: .19 }}
                className="mb-6 font-serif text-4xl italic font-bold leading-tight text-[#B88A2A] sm:text-5xl lg:text-6xl"
            >
                Style Your Look.
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .5, delay: .26 }}
                className="mb-9 max-w-sm text-[15px] leading-7 text-[#6F7B82]"
            >
                Layrd is your AI-powered stylist that helps you mix,
                match and complete outfits effortlessly.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .5, delay: .32 }}
            >
                <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block"
                >
                <Link
                    to="/library"
                    className="flex w-fit items-center gap-2 rounded-lg bg-[#2E2621] px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-[#B88A2A]"
                >
                    Start Styling →
                </Link>
                </motion.div>
            </motion.div>

            </div>

        </div>
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.75,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="
                hidden
                lg:block
                absolute
                right-[3%]
                bottom-[8%]
                z-20
                w-64
                overflow-hidden
                rounded-2xl
                bg-[#FDFBF8]
                shadow-[0_35px_80px_rgba(0,0,0,0.18)]
            "
            >
            <img
                src={aiBoxImg}
                alt="AI Stylist"
                className="block w-full"
            />
        </motion.div>

    </section>
  );
}
export default Hero