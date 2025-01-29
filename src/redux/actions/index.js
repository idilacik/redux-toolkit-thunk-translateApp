import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api"
//* asenkron thunk anksiyonu
export const getLanguages = createAsyncThunk(
    "languages/getLanguages",
     async () => {
        //* API istegi atilir
const res = await api.get("/getLanguages");
//* payload return edilir
return res.data.data.languages;
     }
     );

 export const translateText = createAsyncThunk(
        "translate/translateText",
        async (p) => {
            const params = new URLSearchParams();
            //* API'ye gonderilecek olan paramatreleri belirle
            params.set("source_language", p.sourceLang.value);
            params.set("target_language", p.targetLang.value);
            params.set("text", p.text);
     //* API'ye istek at

         const res = await api.post("/translate", params)
    //* payloadi belirle
return res.data.data;

        }
);