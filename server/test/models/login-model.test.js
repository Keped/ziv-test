const  UserModel =require( '../../src/models/user-model');
const  LoginModel =require( '../../src/models/login-model');
const MOCK_USER_DATA2 =  {name:'TEST_USER2', password:'adminadmin2'};

describe("LOGIN MODEL",()=>{
    beforeAll(() => {
        const {name, password} = MOCK_USER_DATA2;
       return UserModel.signUp(name, password);
    });

    test("Login Stored in DB" ,async()=>{
        const {name} = MOCK_USER_DATA2;
        const user = await UserModel.findOne({name});
        const loginData = {
            ip:"5.5.5.5.5",
            userAgent:"MOCKMOCK",
            user:user,
            createdAt:new Date(),
            active:true
        }
        await LoginModel.create(loginData);
        const found = await LoginModel.findOne(loginData)
        return expect(found.userAgent).toEqual(loginData.userAgent);
        
    });

});