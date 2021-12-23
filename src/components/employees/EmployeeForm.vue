<template>
  <div id="emp-form">
    <div class="box-header">
      <button @click="$emit('addEmp')">Add Employee</button>
    </div>
    <div class="box">
      <h2>Ooops, sorry boss!</h2>
      <p>You haven’t chosen any employee yet...</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#emp-form {
  flex: 1;
  height: 85vh;
  padding-top: 0.5rem;
}
.box-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 24px 16px 12px 16px;
}
.box-header button {
  font-family: "Poppins", sans-serif;
  color: #fff;
  font-weight: 500;
  background: rgba(67, 97, 238, 1);
  transition: all 0.2s ease;
  padding: 4px 10px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
}
.box-header button:hover {
  background: rgba(67, 97, 238, 0.8);
}
.box {
  background: hsla(0, 0%, 86.7%, 0.4);
  height: inherit;
  border-radius: 15px;
  padding: 1rem;
}
</style>
