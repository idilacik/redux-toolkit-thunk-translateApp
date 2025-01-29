import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { getLanguages, translateText } from "./redux/actions"
import { setAnswer } from './redux/slices/translateSlice';



function App() {

const dispatch = useDispatch();
// burayla
const {isLoading, error, languages = []} = useSelector(
  (store) => store.languageReducer);
 
const translateState = useSelector(store=>store.translateReducer)
console.log(translateState)

const [sourceLang, setSourceLang] = useState({
  label:"Turkish",
  value:"tr"
});

const [targetLang, setTargetLang] = useState({
  label:"English",
  value:"en"
});

const [text, setText] = useState("");

useEffect(() => {
  dispatch(getLanguages());
  
}, []);

console.log(text)

  /*
    * dil dizisini bizden istenilen formate çevirme
    * nesnelerin içerisindeki code ve name değerleri value ve label değerlerine çevirdik
    * Diziyi formatlama işlemi her render sırasında olmasını istemediğimiz için useMemo kullanarak
    * cache'e gönderdik
  
  */

const formatted = useMemo(() => 
languages.map((i) => ({
  label: i.name,
  value: i.code,
})),
[languages]
); 

const handleTranslate = () => {
dispatch(translateText({sourceLang, targetLang, text}));
};


const handleSwap = () => {
  //* select alanindaki verilerin yer degistirmesini saglariz
setSourceLang(targetLang);
setTargetLang(sourceLang);

//* reducer'da tutulan cevabı text state'ine aktar
setText(translateState.answer);
//* text state'inde tutulan metni reducer'a aktar
dispatch(setAnswer(text));

};


  return (
    <>
 <div className="bg-zinc-900 h-screen text-white grid place-items-center">
<div className=" w-[80vw] max-w-[1100px] flex flex-col justify-center">
  <h1 className="text-center text-4xl font-semibold mb-7"> Çeviri + </h1>
  {/* ust kisim */}
<div className="flex gap-2 text-black">
  <Select
  value={sourceLang} 
  isDisabled={isLoading} 
  options={formatted} 
  onChange={(e) => setSourceLang(e)}
  className='flex-1'/>
  <button onClick={handleSwap} className='bg-zinc-700 py-2 px-6 hover:bg-zinc-800 transition rounded text-white'>Değiştir</button>
  <Select 
  value={targetLang}
  isDisabled={isLoading} 
  options={formatted} 
  onChange={(e) => setTargetLang(e)}
  className='flex-1' />
</div>

{/* text alanlari */}
<div className='flex gap-3 mt-5 md:gap-[105px] max-md:flex-col'>
  <div className='flex-1'>
    <textarea value={text} onChange={(e) => setText(e.target.value)} className='bg-white w-full min-h-[300px] max-h-[500px] text-black text-[20px] rounded p-[10px]'></textarea>
  </div>
  <div className='flex-1'>
    <textarea disabled value={translateState.answer} className='bg-zinc-500 w-full min-h-[300px] max-h-[500px] text-gray-300 text-[20px] rounded p-[10px]'></textarea>
  </div>
</div>

{/* buton */}

<button onClick={handleTranslate} className='bg-zinc-700 px-5 py-3 rounded-md font-semibold hover:ring-2 hover:bg-zinc-900 cursor-pointer transition mt-3'>Çevir</button>
 

</div>
 </div>
    </>
  )
}

export default App
