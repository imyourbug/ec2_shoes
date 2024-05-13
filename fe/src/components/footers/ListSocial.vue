<template>
  <div class="content-center">
    <ul>
      <li><i class="fa-brands fa-facebook fa-3x"></i></li>
      <li><i class="fa-brands fa-twitter fa-3x"></i></li>
      <li><i class="fa-brands fa-instagram fa-3x"></i></li>
    </ul>
  </div>
</template>

<script setup></script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

body {
  background-color: #000;
}

.content-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

ul {
  display: flex;
  list-style: none;
}

@media (max-width: 700px) {
  ul {
    display: block;
  }
}

ul li {
  margin: 10px;
  height: 70px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
}

ul li i {
  transition: all 0.3s linear;
}

ul li:hover i {
  color: #fff;
  font-size: 17px;
}

ul li:hover::after {
  opacity: 1;
  transform: scale(0.8);
}

ul li::after {
  content: "";
  position: absolute;
  height: inherit;
  width: inherit;
  border-radius: 3px;
  opacity: 0;
  z-index: -1;
  transition: all 0.3s linear;
}

ul li:nth-child(1) {
  border: 2px solid #3b5998;
  color: #3b5998;
}

ul li:nth-child(1)::after {
  background-color: #3b5998;
  color: #3b5998;
}

ul li:nth-child(2) {
  border: 2px solid #00aced;
  color: #00aced;
}

ul li:nth-child(2)::after {
  background-color: #00aced;
  color: #00aced;
}

ul li:nth-child(3) {
  background-color: black;
  border: 2px solid #dd4b39;
  color: #dd4b39;
}

ul li:nth-child(3)::after {
  background-color: #dd4b39;
  color: #dd4b39;
}
</style>
