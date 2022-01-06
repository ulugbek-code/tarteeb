<template>
  <form>
    <h2>Bulk insert</h2>
    <div class="week">
      <div class="inline-week">
        <label>Mon</label>
        <input type="checkbox" />
      </div>
      <div class="inline-week">
        <label>Tue</label>
        <input type="checkbox" />
      </div>
      <div class="inline-week">
        <label>Wed</label>
        <input type="checkbox" />
      </div>
      <div class="inline-week">
        <label>Thu</label>
        <input type="checkbox" />
      </div>
      <div class="inline-week">
        <label>Fri</label>
        <input type="checkbox" />
      </div>
      <div class="inline-week disabledbutton">
        <label>Sat</label>
        <input type="checkbox" />
      </div>
      <div class="inline-week disabledbutton">
        <label>Sun</label>
        <input type="checkbox" />
      </div>
    </div>
    <div class="bulk-wrapper">
      <base-dropdown :options="['task1', 'task2']"></base-dropdown>
    </div>
    <div class="custom">
      <input type="number" placeholder="Hours worked" />
    </div>
    <div class="custom">
      <textarea rows="3" placeholder="Comments here..."></textarea>
      <div class="inline-submit">
        <div class="circle">&#10003;</div>
        <div class="circle">&#215;</div>
      </div>
    </div>
    <div class="custom">
      <label> Weekly Note</label>
      <textarea rows="3" placeholder="Notes here..."></textarea>
      <div class="inline-submit">
        <div class="circle">&#10003;</div>
        <div class="circle">&#215;</div>
      </div>
    </div>
  </form>
</template>

<script>
export default {};
</script>

<style scoped>
form {
  width: 90%;
}
form h2 {
  margin: 0 0 1rem 1rem;
}
.week {
  display: flex;
  margin: 8px;
}
.inline-week {
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 8px;
}
.inline-week input[type="checkbox"] {
  -ms-transform: scale(2); /* IE */
  -moz-transform: scale(2); /* FF */
  -webkit-transform: scale(2); /* Safari and Chrome */
  -o-transform: scale(2); /* Opera */
  transform: scale(2);
}
.disabledbutton {
  pointer-events: none;
  opacity: 0.4;
}
.bulk-wrapper {
  margin: 1rem 0 1rem 12px;
}
.custom {
  display: flex;
  flex-direction: column;
}
.custom input,
.custom textarea {
  width: 96%;
  background: #f2f3f6;
  padding: 8px 12px;
  border-radius: 25px;
  margin: 12px;
  outline: none;
  border: 1px solid rgba(67, 97, 238, 0.35);
  color: #444;
  font-family: "Poppins", sans-serif;
}
.custom label {
  margin-left: 1rem;
}
.inline-submit {
  display: flex;
  margin-bottom: 12px;
  align-self: flex-end;
}
.circle {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #f2f3f6;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #444;
  margin-right: 4px;
}
.circle:first-child {
  font-size: 14px;
}
</style>
