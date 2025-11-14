export class Coordinates {
    constructor(public galaxy:number, public solarSystem:number, public planetPosition:number) {

        this.ensureGalaxyIsValid(galaxy);
        this.ensureSolarSystemIsValid(solarSystem);
        this.ensurePlanetPositionIsValid(planetPosition);

    }

    ensureGalaxyIsValid(galaxy:number):boolean{
        if (galaxy < 1 || galaxy > 15){
            throw new RangeError("Galaxy values must be between 1 and 15");
        }
        return true;

    }

    ensureSolarSystemIsValid(solarSystem:number):boolean {
        if (solarSystem <= 0 || solarSystem > 499) {
            throw new RangeError("Solar system must be between 1 and 5");
        }
        return true;
    }

    ensurePlanetPositionIsValid(planetPosition:number):boolean {
        if (planetPosition <= 0 || planetPosition > 15) {
            throw new RangeError("PlanetPosition must be between 1 and 15");
        }
        return true;
    }
}