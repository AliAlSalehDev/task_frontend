<script setup>
import {ref, onMounted, reactive, inject} from "vue";
import useMenuApi from "@/composeable/MenuApi.js";

const swal = inject('$swal')
const { getAllMenus, storeMenu, updateMenu, deleteMenu, menuData, menuErrors, hasError } = useMenuApi();

const formData = reactive({
  id: "",
  name: "",
  discount: {
    name: "",
    type: "",
    value: ""
  }
});

function clearFields() {
  formData.id = ""
  formData.name = ""
  formData.discount.id = ""
  formData.discount.name = ""
  formData.discount.type = ""
  formData.discount.value = ""
}

let action_type = "store"

function changeActionType(t, el = null) {
  clearFields();
  action_type = t
  if(t === 'update') {
    formData.id = el.id
    formData.name = el.name
    if(el.discount) {
      formData.discount.id = el.discount.id
      formData.discount.name = el.discount.name
      formData.discount.type = el.discount.type
      formData.discount.value = el.discount.value
    }
  }
}

onMounted(getAllMenus);

const storeAction = async () => {

  if(action_type === "store") {
    const result = await storeMenu(formData).then(res => {
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
  } else {
    const result = await updateMenu(formData).then(res => {
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

}

const deleteAction = async (id) => {
  if (!window.confirm("Are you sure?")) {
    return
  }
  await deleteMenu(id).then(res => {
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
        <span @click="menuErrors = [], changeActionType('store') " class="page-title-icon bg-gradient-primary text-white me-2 cursor-pointer" data-bs-toggle="modal" data-bs-target="#addMenuModal">
          <i class="mdi mdi-plus"></i>
        </span>
        Menus
      </h3>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">

          <div class="card-body">
            <h4 class="card-title">All Menus</h4>
            <table class="table">
              <thead>
              <tr>
                <th>Name</th>
                <th>Creation Date</th>
                <th>Options</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(menu, index) in menuData" :key="`menu${index}`">
                <td>{{menu.name}}</td>
                <td>{{menu.created_at}}</td>
                <td>
                  <button class="btn btn-info btn-sm mx-1" type="button" data-bs-toggle="modal" data-bs-target="#addMenuModal" @click="changeActionType('update', menu)">Edit</button>
                  <button class="btn btn-danger btn-sm mx-1" type="button" @click="deleteAction(menu.id)">Delete</button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Modal -->
    <div class="modal fade" id="addMenuModal" tabindex="-1" aria-labelledby="addMenuModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="addMenuModalLabel">Add New Menu</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div :class="`alert alert-danger`" v-for="(msg, index) in menuErrors" :key="index">
              {{ msg.join(",") }}
            </div>

            <div class="form-group">
              <label for="new_name">Menu Name</label>
              <input type="text" class="form-control" id="new_name" v-model="formData.name">
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