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
      <div className="text-center w-full py-6">
       <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
          {sologan}
        </h1>
      </div>
    );
  }
  