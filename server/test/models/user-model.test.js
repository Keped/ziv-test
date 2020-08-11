const  UserModel =require( '../../src/models/user-model');
MOCK_USER_DATA =  {name:'TEST_USER', password:'adminadmin'};
describe("USER MODEL - SIGN UP",()=>{
    beforeAll(() => {
        return UserModel.deleteOne({name:MOCK_USER_DATA.name});
    });

    test("Users model Sign Up" ,async()=>{
        const {name, password} = MOCK_USER_DATA;
        const signUpResult = await UserModel.signUp(name, password);
        return expect(signUpResult.email).toEqual(MOCK_USER_DATA.email);
        
    });

});