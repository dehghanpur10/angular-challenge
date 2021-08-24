import {TestBed} from "@angular/core/testing";

import {ItemComponent} from './item.component'

describe('ItemComponent', () => {
  let itemComponent: ItemComponent
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ItemComponent,
      ]
    });
    itemComponent = TestBed.inject(ItemComponent)
  })
  describe('getBorder function',()=>{
    it('should be return red border',()=>{
      itemComponent.data = {value1:0,value2:"MISSING DATA",action:""}
      const border = itemComponent.getBorder()
      expect(border).toBe('5px solid red')
    })

    it('should be return orange border',()=>{
      itemComponent.data = {value1:0,value2:0,action:"multiply"}
      const border = itemComponent.getBorder()
      expect(border).toBe('5px solid orange')
    })

    it('should be return green border',()=>{
      itemComponent.data = {value1:0,value2:0,action:"add"}
      const border = itemComponent.getBorder()
      expect(border).toBe('5px solid green')
    })
  })

  describe('getResult',()=>{
    it('should be return MISSING DATA',()=>{
      itemComponent.data = {value1:0,value2:"MISSING DATA",action:""}
      const result = itemComponent.getResult()
      expect(result).toBe('MISSING DATA')
    })
    it('should be return multiply',()=>{
      itemComponent.data = {value1:3,value2:5,action:"multiply"}
      const result = itemComponent.getResult()
      expect(result).toBe('3 * 5 = 15')
    })
    it('should be return add',()=>{
      itemComponent.data = {value1:3,value2:5,action:"add"}
      const result = itemComponent.getResult()
      expect(result).toBe('3 + 5 = 8')

    })
  })
})
