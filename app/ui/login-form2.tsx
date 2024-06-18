
export default function LoginForm2() {
  return (
    <div className="h-[100vh]">
      <div className="h-[calc(100vh-30px)]">
        <div className="flex flex-col items-center justify-center min-h-screen py-2 border-gray-400 border-0 bg-gray-100">
          <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center border-gray-600 border-0">
            <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
              <div className="w-3/5 p-5">
                <div className="text-left font-bold">
                  <span className="text-green-500">Company</span> Name
                </div>
                <div className="py-10">
                  <h2 className="text-3xl font-bold text-green-500 mb-2">Sign in to Account</h2>
                  <div className="border-2 w-10 border-green inline-block mb-2"></div>
                  <div className="flex flex-col items-center">
                    <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                      <input type="text" name="userName" placeholder="UserName" className="bg-gray-100 outline-none text-sm flex-1 border-0"></input>
                    </div>
                    <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                      <input type="password" name="password" placeholder="Password" className="bg-gray-100 outline-none text-sm flex-1 border-0"></input>
                    </div>
                    <a href="#" className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white">Sign In</a>
                    
                  </div>
                </div>
              </div>
              <div className="w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
                <h2 className="text-3xl font-bold mb-2">Hello, Friend</h2>
                <div className="border-2 w-10 border-white inline-block mb-2"></div>
                <p className="mb-10">
                  Fill up personal information and start journey with us.
                </p>
                <a href="#" className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500">Sign Up</a>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="divBottomTop h-[30px] bg-gray-900 p-1 text-xs text-white">Version 1.2.0</div>
    </div>
    );
}
