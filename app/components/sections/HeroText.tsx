export default function HeroText() {
    const heading = "M.V.M.N.T"
    const sologan = "Modern Visionaries Making New Traditions"
    function StylizeSlogan(slogan) {
      const words = slogan.split(" ");
    
      return (
        <div className="flex justify-center">
          {words.map((word, index) => {
            const first = word.charAt(0);
            const rest = word.slice(1);
    
            // Add dot if not the last word
            const displayFirst = index < words.length - 1 ? `${first}.` : first;
    
            return (
              <span key={index} className="flex flex-col items-center px-0.5">
                {/* BIG FIRST LETTER (with dot if not last word) */}
                <span className="font-bold text-6xl leading-none">
                  {displayFirst}
                </span>
    
                {/* SMALL REST OF WORD */}
                <span className="text-sm leading-none">
                  {rest}
                </span>
              </span>
            );
          })}
        </div>
      );
    }
    
    
    
    
    
    

    return (
      <div className="text-center px-4 py-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
          {heading}
        </h1>
        <p className=" text-white">
          {sologan}
        </p>
        <p className="text-sm sm:text-base md:text-lg w-full mb-6 leading-relaxed text-gray-300 mt-4">
          Bringing chaos to order, bass to basements, and community to the
          concrete. We throw parties that don’t ask for permission, just your
          presence.
        </p>
      </div>
    );
  }
  