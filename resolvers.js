const db = require('./db');

const Query = {
   students:() => db.students.list(),  
   college:() => db.colleges.list(),
   studentById:(root,args,context,info) => {
      //args will contain parameter passed in query
      return db.students.get(args.id);
   }
}  

const Student = {
   fullName:(root,args,context,info) => {
      return root.firstName+":"+root.lastName
   },
   college:(root) => {
      return db.colleges.get(root.collegeId);
   }
}

const College = {  
    studentsByCollge:(root) => {
      return   db.students.list().filter(function(item) {
                      return item.collegeId == root.id;
              });
   }
}

const Mutation = {
   returnStringByCreateStudent:(root,args,context,info) => {
      return  db.students.create({collegeId:args.collegeId,
      firstName:args.firstName,
      lastName:args.lastName,
      email:args.email,
      password:args.password,
      age:args.age,})
      
   },
   returnObjectByCreateStudent:(root,args,context,info) => {
      const id =  db.students.create({collegeId:args.collegeId,
      firstName:args.firstName,
      lastName:args.lastName,
      email:args.email,
      password:args.password,
      age:args.age,})
     return db.students.get(id)
   }
}


module.exports = {Query,Student, College,Mutation}