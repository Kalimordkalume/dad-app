export class PlanetName {
    private static readonly MIN_LENGTH = 3;
    private static readonly MAX_LENGTH = 50;

    constructor(public value:string) {
        this.ensureIsValidPlanetName(value);
    }

    ensureIsValidPlanetName(value: string) {
        if (value.length < PlanetName.MIN_LENGTH) {
            throw new Error("Invalid planetName length. Must be greater or equal than 3.")
        }

        if (value.length > PlanetName.MAX_LENGTH) {
            throw new Error("Invalid planetName length. Must be lesser or equal than 50.")
        }
    }

}


