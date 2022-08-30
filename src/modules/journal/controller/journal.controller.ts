import { ControllerProperty } from 'src/core/decorators/controller-decorators/class-decorators/controller-property.decorator';

@ControllerProperty('v1/journals', 'Journals')
export class JournalController {
  constructor() {
    // fill above parentheses with use case / repository dependencies
  }
}
