import { ControllerProperty } from 'src/core/decorators/controller-decorators/class-decorators/controller-property.decorator';

@ControllerProperty('v1/trial-balances', 'Trial Balances')
export class TrialBalanceController {
  constructor() {
    // fill above parentheses with use case / repository dependencies
  }
}
