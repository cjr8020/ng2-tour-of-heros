import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService{


  /*
   *  You wrap the heroes array in an object
   * 
   * NOTE: the variable name, 'mockheroes' in this case dictates the API URL:
   * 
   *    private heroesUrl = 'api/mockheroes';
   *  
   */
  createDb() {
    let mockheroes = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {mockheroes};
  }

}
