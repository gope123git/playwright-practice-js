export const loginData = [
    {
        testName: 'valid credentials',
        username: '9900000001',
        password: '12345pP',
        expectedResult: 'success'
    },
     {
        testName: 'invalid usename',
        username: '9988335577',
        password: '12345pP',
        expectedResult: 'invalid'
    },
     {
        testName: 'invalid password',
        username: '9900000001',
        password: '12345689sssPp',
        expectedResult: 'invalid'
    },

];