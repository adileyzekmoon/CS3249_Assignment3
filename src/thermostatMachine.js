import { Machine } from 'xstate';

// Stateless machine definition
// machine.transition(...) is a pure function used by the interpreter.
export const thermostatMachine = Machine({
  id: 'Thermostat',
  initial: 'start',
  states: {
      start: { on: { Neutral: 'OffMode',
                   Hot: "CoolingMode",
                   Cold: "HeatingMode",
                   AdjustThermostat: "changeTargetTemperature"} },
      changeTargetTemperature: { on: { Neutral: 'OffMode',
                                      Hot: "CoolingMode",
                                      Cold: "HeatingMode",
                   }},
      HeatingMode: { on: { Neutral: 'OffMode',
                          AdjustThermostat: "changeTargetTemperature"}},
      CoolingMode: { on: { Neutral: 'OffMode',
                          AdjustThermostat: "changeTargetTemperature"}},
      OffMode: { on: {Hot: "CoolingMode",
                      Cold: "HeatingMode",
                      AdjustThermostat: "changeTargetTemperature"}}
  }
});

//// Machine instance with internal state
//const toggleService = interpret(thermostat)
//  .onTransition(state => console.log(state.value))
//  .start();
//// => 'inactive'
//
//toggleService.send('TOGGLE');
//// => 'active'
//
//toggleService.send('TOGGLE');
//// => 'inactive'