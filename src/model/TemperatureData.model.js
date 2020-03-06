class TemperatureData{
    constructor(currentTemperature, targetTemperature, dT, dTCool, dTHeat){
        this.currentTemperature = currentTemperature
        this.targetTemperature = targetTemperature;
        this.dT = dT;
        this.dTCool = dTCool;
        this.dTHeat = dTHeat;
    }
}

export default TemperatureData;