const db = require('./db');

const Query = {
   students:() => db.students.list(),  
   college:() => db.colleges.list(),
   studentById:(root,args,context,info) => {
      //args will contain parameter passed in query
      return db.students.get(args.id);
   },
  setFavouriteColor:(root,args) => {
   return  "Your Fav Color is :"+args.color;
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
      return  db.students.create({collegeId:args.input.collegeId,
      firstName:args.input.firstName,
      lastName:args.input.lastName,
      email:args.input.email,
      password:args.input.password,
      age:args.input.age,})
      
   },
   returnObjectByCreateStudent:(root,args,context,info) => {
      const id =  db.students.create({collegeId:args.input.collegeId,
       firstName:args.input.firstName,
      lastName:args.input.lastName,
      email:args.input.email,
      password:args.input.password,
      age:args.input.age,})
     return db.students.get(id)
   },
   returnStringUpdateDataSudentById:(root,args,context,info) => {
      return args.id+args.input.firstName
   },
   returnStudentUpdateDataSudentById:(root,args,context,info) => {
       const objectStudent = db.students.get(args.id);
       if(args.input.firstName!=''){

         objectStudent.firstName = args.input.firstName;
       }

       if(args.input.email!=''){

         objectStudent.email = args.input.email;
       }

       if(args.input.age!=''){

         objectStudent.age = args.input.age;
       }    
       
      const result = db.students.update(
        {
          id: args.id,
          firstName:objectStudent.firstName,
          email: objectStudent.email,
          age: objectStudent.age,
          lastName: objectStudent.lastName
        });
      return db.students.get(args.id)       
      
   }
}


module.exports = {Query,Student, College,Mutation}