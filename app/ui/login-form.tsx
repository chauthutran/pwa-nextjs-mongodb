import { lusitana } from '@/app/ui/fonts';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { CiUser } from "react-icons/ci";
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { IoKeyOutline } from "react-icons/io5";
import useAppContext from '../contexts';
import * as Constant from '@/app/lib/constants';
import * as AppStore from '@/app/lib/appStorage';
import * as api from '@/app/lib/api';

export default function LoginForm() {

  // const { login, loading } = useAuth();

  const { setMainUi } = useAppContext();

  const [user, setUser] = useState(AppStore.getUser());
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("test1");
  const [pin, setPin] = useState("1234");

  useEffect(() => {
    if( AppStore.getUser() != null ) {
      setMainUi(Constant.UI_CLIENT_LIST);
    }
  },[user])

  const loginBtnClick = async() => {
    setLoading(true);

    const userData = await api.checkLogin(username, pin);
    if( userData != null ) {
      AppStore.setUser(userData);
      setUser(userData);
    }

    setLoading(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="username"
                name="username"
                value={username}
                placeholder="Enter your username"
                required
                onChange={(e) => { setUsername(e.target.value) }}
              />
              <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"></CiUser>
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="pin"
            >
              Pin
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="pin"
                type="password"
                name="pin"
                placeholder="Enter pin"
                value={pin}
                required
                minLength={4}
                onChange={(e) => { setPin( e.target.value ) }}
              />
              <IoKeyOutline className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <LoginButton loginBtnClick={loginBtnClick} loading={loading} />
        <div className="flex h-8 items-end space-x-1">
          {/* Add form errors here */}
        </div>
      </div>
    </div>
  );
}

function LoginButton({loginBtnClick, loading = false}: {loading: boolean, loginBtnClick: () => void }) {

  return (
    <Button className="mt-4 w-full" onClick={ (e) => { loginBtnClick(); } }>
      Log in 
        {!loading ? <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
          : <FaSpinner  className="ml-auto h-5 w-5 text-gray-50" />}
    </Button>
  );
}
