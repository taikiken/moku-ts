// import EventDispatcher from '../EventDispatcher';
// import Events from '../Events';
//
// describe('EventDispatcher TEST', () => {
//   test('static handler', () => {
//     // Mock handler for toast event
//     const handler = jest.fn((events) => console.log('handler', events));
//     const eventDispatcher = new EventDispatcher();
//     eventDispatcher.on('xxx', handler);
//     eventDispatcher.dispatch(new Events('xxx'));
//     expect(handler).toHaveBeenCalled();
//   });
//
//   test('object callback', () => {
//     const obj = {
//       a: 1,
//       handler: () => {
//         // @ts-ignore
//         // return this.a;
//         console.log('object.handler', this, this.a);
//       },
//     };
//     const eventDispatcher = new EventDispatcher();
//     eventDispatcher.on('aaa', obj.handler);
//     expect(eventDispatcher.dispatch(new Events('aaa'))).toEqual(true);
//   });
//
//   test('class callback', () => {
//     class Obj {
//       a: number;
//       eventDispatcher: EventDispatcher;
//       handler = () => {
//         console.log('Callback.handler', this, this.a);
//       };
//       constructor() {
//         this.a = 1;
//         this.eventDispatcher = new EventDispatcher();
//       }
//       // handler() {
//       //   console.log('Callback.handler', this, this.a)
//       // }
//       start() {
//         this.eventDispatcher.on('bbb', this.handler);
//       }
//     }
//
//     const obj = new Obj();
//     obj.start();
//     expect(obj.eventDispatcher.dispatch(new Events('bbb'))).toEqual(true);
//   });
// });
