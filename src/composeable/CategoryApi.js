import {sender} from "@/utils/axios.js";
import {ref} from "vue";

export default function useCategoryApi() {
    const categoryData = ref([]);
    const categoryErrors = ref([])
    let hasError = ref(false)

    const getAllCategories = async () => {
        categoryData.value = [];
        categoryErrors.value = [];
        try {
            const res = await sender.get("/categories");
            categoryData.value = res.data;
        } catch (err) {
            console.log('Err', err);
        }
    }

    const storeCategory = async (formData) => {
        hasError.value = false
        categoryErrors.value = []
        if(formData.discount.name === "") {
            delete formData.discount.name
            delete formData.discount.type
            delete formData.discount.value
        }
        try {
            await sender.post("/categories", formData)
                .then((res) => {
                    hasError.value = false
                    categoryData.value.push(res.data)
                })
                .catch((err) => {
                    hasError.value = true
                    if(err.response.status === 400)
                        categoryErrors.value.push(["Cannot Add Mix Items and Categories"])
                    else
                        categoryErrors.value = err.response.data.errors
                })
        } catch (err) {
            console.log('Err', err);
        }
        return hasError.value
    }


    const deleteCategory = async (id) => {
        try {
            sender.delete(`/categories/${id}`)
                .then((res) => {
                    const index = categoryData.value.findIndex(item => item.id === id);
                    if (index !== -1) {
                        categoryData.value.splice(index, 1);
                    }
                })
        } catch (err) {
            console.log(err)
        }
    }

    return {
        getAllCategories,
        storeCategory,
        deleteCategory,
        categoryData,
        categoryErrors,
        hasError
    }

}