import { useMainUi } from './MainUiContext';

const useAppContext = () => {
    const mainUiContext = useMainUi();
  
    return {
      ...mainUiContext
    };
  };
  
  export default useAppContext;