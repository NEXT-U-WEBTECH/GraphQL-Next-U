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
     
      const {email,firstName,password} = args.input;

      const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
      const isValidEmail =  emailExpression.test(String(email).toLowerCase())
     
      if(!isValidEmail){

        throw new Error("Adresse mail non valide ")
      }     

      if(firstName.length > 15){

        throw new Error("firstName doit comporter moins de 15 caractères")        
      }      

      if(password.length < 8 ){
          throw new Error("le mot de passe doit comporter au moins 8 caractères")
      }    
      
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
      
   },
   returnBooleanDeleteDataSudentById:(root,args,context,info) => {
      const result = db.students.delete(args.id); // return null
     /*if(result){
       return true;
     }else{
       return false;
     }*/
     return true
   },
}


module.exports = {Query,Student, College,Mutation}