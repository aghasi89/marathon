// import {createServer, Model} from 'miragejs';
// import Keys from '../services/Keys';
// //@ts-ignore
// if (window.server) {
//   //@ts-ignore
//   server.shutdown();
// }
// //@ts-ignore
// window.server = createServer({
//   models: {
//     exercieses: Model,
//     workouts: Model,
//     marathonGroups: Model,
//   },
//   seeds(server) {
//     server.db.loadData({
//       tags: [
//         {id: 1, title: 'Quadriceps'},
//         {id: 2, title: 'Chaest'},
//         {id: 3, title: 'Back'},
//         {id: 4, title: 'Calves'},
//         {id: 5, title: 'Forearms'},
//         {id: 6, title: 'Triceps'},
//         {id: 7, title: 'Shoulders'},
//         {id: 8, title: 'Abs'},
//       ],
//       equipement: [
//         {id: 1, title: 'Quadriceps'},
//         {id: 2, title: 'Chaest'},
//         {id: 3, title: 'Back'},
//         {id: 4, title: 'Calves'},
//         {id: 5, title: 'Forearms'},
//         {id: 6, title: 'Triceps'},
//         {id: 7, title: 'Shoulders'},
//         {id: 8, title: 'Abs'},
//       ],
//       muscules: [
//         {id: 1, title: 'Quadriceps'},
//         {id: 2, title: 'Chaest'},
//         {id: 3, title: 'Back'},
//         {id: 4, title: 'Calves'},
//         {id: 5, title: 'Forearms'},
//         {id: 6, title: 'Triceps'},
//         {id: 7, title: 'Shoulders'},
//         {id: 8, title: 'Abs'},
//       ],
//       marathonGroupCategories: [
//         {id: 0, title: 'Abs'},
//         {id: 1, title: 'Quadriceps'},
//         {id: 2, title: 'Chaest'},
//         {id: 3, title: 'Back'},
//         {id: 4, title: 'Calves'},
//         {id: 5, title: 'Forearms'},
//         {id: 6, title: 'Triceps'},
//         {id: 7, title: 'Shoulders'},
//       ],
//       marathonGroupTags: [
//         {id: 1, title: 'Quadriceps'},
//         {id: 2, title: 'Chaest'},
//         {id: 3, title: 'Back'},
//         {id: 4, title: 'Calves'},
//         {id: 5, title: 'Forearms'},
//         {id: 6, title: 'Triceps'},
//         {id: 7, title: 'Shoulders'},
//         {id: 8, title: 'Abs'},
//       ],
//       users: [
//         {
//           id: 0,
//           firstName: 'Olivie',
//           lastName: 'Gibson',
//           address: 'Belgium, Brussels',
//           isConnect: true,
//           imageUrl:
//             'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
//           isRemote: false,
//           isInPerson: false,
//           isInvited: false,
//         },
//         {
//           id: 1,
//           firstName: 'Olivie',
//           lastName: 'Gibson',
//           address: 'Belgium, Brussels',
//           isConnect: true,
//           imageUrl:
//             'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
//           isRemote: true,
//           isInPerson: false,
//           isInvited: false,
//         },
//         {
//           id: 2,
//           firstName: 'Olivie',
//           lastName: 'Gibson',
//           address: 'Belgium, Brussels',
//           isConnect: true,
//           imageUrl:
//             'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
//           isRemote: false,
//           isInPerson: true,
//           isInvited: false,
//         },
//       ],
//       groupList: [
//         {
//           id: 0,
//           name: 'Group Name',
//           users: [
//             {
//               id: 0,
//               firstName: 'Olivie',
//               lastName: 'Gibson',
//               address: 'Belgium, Brussels',
//               isConnect: true,
//               imageUrl:
//                 'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
//             },
//             {
//               id: 1,
//               firstName: 'Olivie',
//               lastName: 'Gibson',
//               address: 'Belgium, Brussels',
//               isConnect: true,
//               imageUrl:
//                 'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
//             },
//             {
//               id: 2,
//               firstName: 'Olivie',
//               lastName: 'Gibson',
//               address: 'Belgium, Brussels',
//               isConnect: true,
//               imageUrl:
//                 'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
//             },
//           ],
//           listTags: [
//             {id: 0, title: 'tag 1'},
//             {id: 1, title: 'tag 2'},
//           ],
//         },
//         {
//           id: 1,
//           name: 'Group Name',
//           users: [
//             {
//               id: 0,
//               firstName: 'Olivie',
//               lastName: 'Gibson',
//               address: 'Belgium, Brussels',
//               isConnect: true,
//               imageUrl:
//                 'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
//             },
//             {
//               id: 1,
//               firstName: 'Olivie',
//               lastName: 'Gibson',
//               address: 'Belgium, Brussels',
//               isConnect: true,
//               imageUrl:
//                 'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
//             },
//             {
//               id: 2,
//               firstName: 'Olivie',
//               lastName: 'Gibson',
//               address: 'Belgium, Brussels',
//               isConnect: true,
//               imageUrl:
//                 'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
//             },
//             {
//               id: 3,
//               firstName: 'Olivie',
//               lastName: 'Gibson',
//               address: 'Belgium, Brussels',
//               isConnect: true,
//               imageUrl:
//                 'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
//             },
//           ],
//           listTags: [
//             {id: 0, title: 'tag 1'},
//             {id: 1, title: 'tag 2'},
//           ],
//         },
//       ],
//       notifications: [
//         {
//           name: 'Maya Crouch',
//           title: 'Sent a ‘’Marathon Name’’ participation request',
//           imageUrl:
//             'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
//           date: '20 June 2020',
//           unRead: false,
//         },
//         {
//           name: 'Maya Crouch',
//           title: 'Sent a ‘’Marathon Name’’ participation request',
//           imageUrl:
//             'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
//           date: '20 June 2020',
//           unRead: true,
//         },
//         {
//           name: 'Maya Crouch',
//           title: 'Sent a ‘’Marathon Name’’ participation request',
//           imageUrl:
//             'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
//           date: '20 June 2020',
//           unRead: true,
//         },
//       ],
//       payments: [
//         {
//           name: 'Maya Crouch',
//           title: 'Subscribe marathon',
//           imageUrl:
//             'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
//           date: '27.04.2021',
//           price: '80',
//         },
//         {
//           name: 'Maya Crouch',
//           title: 'Subscribe marathon',
//           imageUrl:
//             'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
//           date: '27.04.2021',
//           price: '80',
//         },
//         {
//           name: 'Maya Crouch',
//           title: 'Subscribe marathon',
//           imageUrl:
//             'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
//           date: '27.04.2021',
//           price: '80',
//         },
//         {
//           name: 'Maya Crouch',
//           title: 'Subscribe marathon',
//           imageUrl:
//             'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
//           date: '27.04.2021',
//           price: '80',
//         },
//       ],
//     });
//   },
//   routes() {
//     this.post(`${Keys.API_URL}/login`, (schema, request) => {
//       const result = JSON.parse(request.requestBody);
//       return {
//         token: 'TOKEN123456',
//       };
//     });
//     this.get(`${Keys.API_URL}/exercises`, (schema: any) => {
//       return schema.exercieses.all();
//     });
//     this.post(`${Keys.API_URL}/exercise`, (schema: any, request) => {
//       let attrs = JSON.parse(request.requestBody);
//       attrs.id = Math.floor(Math.random() * 100);
//       return schema.exercieses.create(attrs);
//     });
//     this.patch(`${Keys.API_URL}/exercises/:id`, (schema: any, request) => {
//       let newAttrs = JSON.parse(request.requestBody);
//       let id = request.params.id;
//       let exercise = schema.exercieses.find(id);
//       return exercise.update(newAttrs);
//     });
//     this.get(`${Keys.API_URL}/exercises/:id`, (schema: any, request) => {
//       let id = request.params.id;
//       let exercise = schema.exercieses.find(id);
//       return exercise;
//     });
//     this.delete(`${Keys.API_URL}/exercises/:id`, (schema: any, request) => {
//       let id = request.params.id;
//       return schema.exercieses.find(id).destroy();
//     });
//     this.get(`${Keys.API_URL}/workouts`, (schema: any) => {
//       return schema.workouts.all();
//     });
//     this.post(`${Keys.API_URL}/workout`, (schema: any, request) => {
//       let attrs = JSON.parse(request.requestBody);
//       attrs.id = Math.floor(Math.random() * 100);
//       return schema.workouts.create(attrs);
//     });
//     this.patch(`${Keys.API_URL}/workouts/:id`, (schema: any, request) => {
//       let newAttrs = JSON.parse(request.requestBody);
//       let id = request.params.id;
//       let workout = schema.workouts.find(id);
//       return workout.update(newAttrs);
//     });
//     this.get(`${Keys.API_URL}/workouts/:id`, (schema: any, request) => {
//       let id = request.params.id;
//       let workout = schema.workouts.find(id);
//       return workout;
//     });
//     this.delete(`${Keys.API_URL}/workouts/:id`, (schema: any, request) => {
//       let id = request.params.id;
//       return schema.workouts.find(id).destroy();
//     });
//     this.get(`${Keys.API_URL}/tags`, schema => {
//       return schema.db.tags;
//     });
//     this.get(`${Keys.API_URL}/equipement`, schema => {
//       return schema.db.equipement;
//     });
//     this.get(`${Keys.API_URL}/muscules`, schema => {
//       return schema.db.muscules;
//     });
//     //
//     //
//     //
//     this.get(`${Keys.API_URL}/marathonGroup/categories`, schema => {
//       return schema.db.marathonGroupCategories;
//     });
//     this.get(`${Keys.API_URL}/marathonGroup/tags`, schema => {
//       return schema.db.marathonGroupTags;
//     });
//     this.get(`${Keys.API_URL}/marathonGroups`, (schema: any) => {
//       return schema.marathonGroups.all();
//     });
//     this.post(`${Keys.API_URL}/marathonGroup`, (schema: any, request) => {
//       let attrs = JSON.parse(request.requestBody);
//       attrs.id = Math.floor(Math.random() * 100);
//       return schema.marathonGroups.create(attrs);
//     });
//     this.delete(
//       `${Keys.API_URL}/marathonGroups/:id`,
//       (schema: any, request) => {
//         let id = request.params.id;
//         return schema.marathonGroups.find(id).destroy();
//       },
//     );
//     this.get(`${Keys.API_URL}/marathonGroups/:id`, (schema: any, request) => {
//       let id = request.params.id;
//       let group = schema.marathonGroups.find(id);
//       return group;
//     });
//     this.patch(`${Keys.API_URL}/marathonGroups/:id`, (schema: any, request) => {
//       let newAttrs = JSON.parse(request.requestBody);
//       let id = request.params.id;
//       let group = schema.marathonGroups.find(id);
//       return group.update(newAttrs);
//     });
//     this.get(`${Keys.API_URL}/clients`, schema => {
//       return schema.db.users;
//     });
//     this.get(`${Keys.API_URL}/leads`, schema => {
//       return schema.db.users;
//     });
//     this.get(`${Keys.API_URL}/groups`, schema => {
//       return schema.db.groupList;
//     });
//     this.get(`${Keys.API_URL}/notifications`, schema => {
//       return schema.db.notifications;
//     });
//     this.get(`${Keys.API_URL}/payments`, schema => {
//       return schema.db.payments;
//     });
//   },
// });
// //@ts-ignore
// export default window.server;
