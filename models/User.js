class User{
    constructor(firstName, lastName, gender, age, thumbnail){
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.thumbnail = thumbnail; 
    }

    // Getters
    firstName(){
        return this.firstName;
    }
    
    lastName(){
        return this.lastName;
    }

    gender(){
        return this.gender;
    }

    age(){
        return this.age;
    }

    thumbnail(){
        return this.thumbnail;
    }

}