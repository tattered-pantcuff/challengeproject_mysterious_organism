// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ["A", "T", "C", "G"];
    return dnaBases[Math.floor(Math.random() * 4)];
  };
  
  // Returns a random single strand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase());
    }
    return newStrand;
  };
  /* factory function to generate animal objects 
  specimenNum is an integer, dna is return value of mockUpStrand */
  const pAequorFactory = (specimenNum, dna) => {
    return {
      specimenNum: specimenNum,
      dna: dna,
      mutate() {
        let ranIndex = Math.floor(Math.random() * 15);
        let ranBase = this.dna[ranIndex];
        let baseArray = ["A", "T", "C", "G"];
        const index = baseArray.indexOf(ranBase);
        if (index > -1) {
          baseArray.splice(index, 1);
        }
        ranBase = baseArray[Math.floor(Math.random() * 3)];
        return this.dna.splice(ranIndex, 1, ranBase);
      },
      compareDNA(anotherAnimal) {
        let sum = 0;
        if (this.dna.length === anotherAnimal.dna.length) {
          for (i = 0; i < this.dna.length; i++) {
            if (this.dna[i] === anotherAnimal.dna[i]) {
              sum = sum + 1;
            }
          }
        } else console.log("Error, specimen DNA lengths do not match!");
        console.log(sum);
        let commonPerc = Math.floor((sum / 15) * 100);
        console.log(commonPerc);
        console.log(
          "specimen #1 and specimen #2 have " + commonPerc + "% DNA in common."
        );
      },
      willLikelySurvive() {
        let sum = 0;
        for (i = 0; i < this.dna.length; i++) {
          if (this.dna[i] === "C" || this.dna[i] === "G") {
            sum = sum + 1;
          }
        }
        let targetPerc = Math.floor((sum / 15) * 100);
        if (targetPerc >= 60) {
          return true;
        } else return false;
      },
    };
  };

  // function to generate array of animals of size num //
  const generateAnimals = (num) => {
    let animalArray = [];
    let i = 1;
    do {
      let newAnimal = pAequorFactory(i, mockUpStrand());
  
      if (newAnimal.willLikelySurvive() === true) {
        animalArray.push(newAnimal);
        i = i + 1;
      }
    } while (i <= num);
    return animalArray;
  };