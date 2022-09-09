import { ControllerProperty } from 'src/core/decorators/controller-decorators/class-decorators/controller-property.decorator';

@ControllerProperty('v1/journal-reports', 'Journal Reports')
export class JournalReportsController {
  constructor() {
    // fill above parentheses with use case / repository dependencies
  }
}
