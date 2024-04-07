import {sender} from "@/utils/axios.js";
import {ref} from "vue";

export default function useMenuApi() {
    const menuData = ref([]);
    const menuErrors = ref(null)
    let hasError = ref(false)

    const getAllMenus = async () => {
        menuData.value = [];
        try {
            const res = await sender.get("/menus");
            menuData.value = res.data;
        } catch (err) {
            console.log('Err', err);
        }
    }

    const storeMenu = async (formData) => {
        hasError.value = false
        if(formData.discount.name === "") {
            delete formData.discount.id
            delete formData.discount.name
            delete formData.discount.type
            delete formData.discount.value
        }
        try {
            await sender.post("/menus", formData)
                .then((res) => {
                    hasError.value = false
                    menuData.value.push(res.data)
                })
                .catch((err) => {
                    hasError.value = true
                    menuErrors.value = err.response.data.errors
                })
        } catch (err) {
            // errors.value = err.response.data.errors
            console.log(err.response.data.errors);
        }

        return hasError.value

    }

    const updateMenu = async (formData) => {
        hasError.value = false
        if(formData.discount.name === "") {
            delete formData.discount.name
            delete formData.discount.type
            delete formData.discount.value
        }
        let id = formData.id
        delete formData.id
        try {
            await sender.patch(`/menus/${id}`, formData)
                .then((res) => {
                    hasError.value = false
                    const index = menuData.value.findIndex(item => item.id === id);
                    menuData.value[index] = res.data
                })
                .catch((err) => {
                    hasError.value = true
                    menuErrors.value = err.response.data.errors
                })
        } catch (err) {
            // errors.value = err.response.data.errors
            console.log(err.response.data.errors);
        }

        return hasError.value

    }


    const deleteMenu = async (id) => {
        try {
            sender.delete(`/menus/${id}`)
                .then((res) => {
                    const index = menuData.value.findIndex(item => item.id === id);
                    if (index !== -1) {
                        menuData.value.splice(index, 1);
                    }
                })
                .catch((err) => {
                    menuErrors.value = err.response.data.errors
                })
        } catch (err) {
            console.log(err)
        }
    }

    return {
        getAllMenus,
        storeMenu,
        updateMenu,
        deleteMenu,
        menuData,
        menuErrors,
        hasError
    }

}