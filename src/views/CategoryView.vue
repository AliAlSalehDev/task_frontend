<script setup>
import {onMounted, reactive, inject} from "vue";
import useCategoryApi from "@/composeable/CategoryApi.js";
import useMenuApi from "@/composeable/MenuApi.js";

const swal = inject('$swal')


const { getAllCategories,storeCategory, deleteCategory, categoryData, categoryErrors, hasError } = useCategoryApi();
const {getAllMenus,menuData} = useMenuApi();

const formData = reactive({
  name: "",
  parent_id: "",
  menu_id: "",
  discount: {
    name: "",
    type: "",
    value: ""
  }
});

function clearFields() {
  formData.name = ""
  formData.parent_id = ""
  formData.menu_id = ""
  formData.discount.name = ""
  formData.discount.type = ""
  formData.discount.value = ""
}

onMounted(() => {
  getAllCategories();
  getAllMenus();
});

const storeAction = async () => {
  await storeCategory(formData).then(res => {
    clearFields();
    if(!res)
    {
      document.getElementById('close').click();
      swal.fire({
        title: "Done!",
        icon: "success"
      });
    }
  })
}


const deleteAction = async (id) => {
  if (!window.confirm("Are you sure?")) {
    return
  }
  await deleteCategory(id).then(res => {
    if(!res)
    {
      document.getElementById('close').click();
      swal.fire({
        title: "Done!",
        icon: "success"
      });
    }
  })
}

</script>

<template>
  <div class="content-wrapper">
    <div class="page-header">
      <h3 class="page-title">
        <span @click="categoryErrors = []" class="page-title-icon bg-gradient-primary text-white me-2 cursor-pointer" data-bs-toggle="modal" data-bs-target="#addCategoryModal">
          <i class="mdi mdi-plus"></i>
        </span>
        Categories
      </h3>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">All Categories</h4>
            <table class="table">
              <thead>
              <tr>
                <th>Name</th>
                <th>Parent</th>
                <th>Creation Date</th>
                <th>Options</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(category, index) in categoryData" :key="`category${index}`">
                <td>{{category.name}}</td>
                <td>{{category.parent?.name}}</td>
                <td>{{category.created_at}}</td>
                <td>
                  <button class="btn btn-danger btn-sm mx-1" type="button" @click="deleteAction(category.id)">Delete</button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Modal -->
    <div class="modal fade" id="addCategoryModal" tabindex="-1" aria-labelledby="addCategoryModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="addCategoryModalLabel">Add New Category</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="alert alert-danger" v-for="(error, index) in categoryErrors" :key="index">{{ error.join(",") }}</div>
            <div class="form-group">
              <label for="new_name">Category Name</label>
              <input type="text" class="form-control" id="new_name" v-model="formData.name">
            </div>
            <div class="form-group">
              <label for="parent">Parent Category</label>
              <select id="parent" class="form-select" v-model="formData.parent_id">
                <option :value="cat.id" v-for="(cat, index) in categoryData" :key="`cat${index}`">{{ cat.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="menu">Menu</label>
              <select id="menu" class="form-select" v-model="formData.menu_id">
                <option :value="menu.id" v-for="(menu, index) in menuData" :key="`menu${index}`">{{ menu.name }}</option>
              </select>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label for="discount_name">Discount Name</label>
                  <input type="text" class="form-control" id="discount_name" v-model="formData.discount.name">
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="discount_type">Discount Type</label>
                  <select id="discount_type" class="form-select" v-model="formData.discount.type">
                    <option value="fixed">Fixed</option>
                    <option value="percentage">Percentage</option>
                  </select>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="discount_value">Discount Value</label>
                  <input type="number" min="1" class="form-control" id="discount_value" v-model="formData.discount.value">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="close">Close</button>
            <button type="button" class="btn btn-primary" @click="storeAction()">Save</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>