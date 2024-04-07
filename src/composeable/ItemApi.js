import {sender} from "@/utils/axios.js";
import {ref} from "vue";

export default function useItemApi() {
    const itemData = ref([]);
    const itemErrors = ref([])
    let hasError = ref(false)

    const getAllItems = async () => {
        itemData.value = [];
        try {
            const res = await sender.get("/items");
            itemData.value = res.data;
        } catch (err) {
            console.log('Err', err);
        }
    }

    const storeItem = async (formData) => {
        hasError.value = false
        itemErrors.value = []
        if(formData.discount.name === "") {
            delete formData.discount.name
            delete formData.discount.type
            delete formData.discount.value
        }
        try {
            await sender.post("/items", formData)
                .then((res) => {
                    hasError.value = false
                    itemData.value.push(res.data)
                })
                .catch((err) => {
                    if(err.response.status === 400)
                        itemErrors.value.push(["Cannot Add Mix Items and Categories"])
                    else
                        itemErrors.value = err.response.data.errors
                    hasError.value = true
                })
        } catch (err) {
            console.log('Err', err);
        }
        return hasError.value
    }


    const deleteItem = async (id) => {
        try {
            sender.delete(`/items/${id}`)
                .then((res) => {
                    const index = itemData.value.findIndex(item => item.id === id);
                    if (index !== -1) {
                        itemData.value.splice(index, 1);
                    }
                })
        } catch (err) {
            console.log(err)
        }
    }

    return {
        getAllItems,
        storeItem,
        deleteItem,
        itemData,
        itemErrors,
        hasError
    }

}