<template>
  
  
  <div class="p-330-6">
    <div class="container-fluid pt-4">
      <div class="row">
        <div class="col-auto col-sm-auto col-md-auto col-lg-auto col-xl-auto p-0">
            <div style="width: 85px;">
              
            </div>
        </div>
        <div class="col-auto">
          <nav aria-label="breadcrumb hidden">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="/eed-frontend/#/main" class="svgHome">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 59 576 512" class="uk-icon-up2 uk-svg" width="20" height="20"><path d="M496 512H368a16 16 0 0 1-16-16V368a16 16 0 0 0-16-16h-96a16 16 0 0 0-16 16v128a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16V311c1.78-1.21 3.85-1.89 5.47-3.35L288 115l218.74 192.9c1.54 1.38 3.56 2 5.26 3.2V496a16 16 0 0 1-16 16z" class="fa-secondary"></path><path d="M527.92 283.88L298.6 81.61a16 16 0 0 0-21.17 0L48.11 283.89a16 16 0 0 1-22.59-1.21L4.1 258.89a16 16 0 0 1 1.21-22.59l256-226a39.85 39.85 0 0 1 53.45 0L416 99.67V48a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v136.43l58.69 51.83a16 16 0 0 1 1.22 22.59l-21.4 23.82a16 16 0 0 1-22.59 1.21z" class="fa-primary"></path></svg>
                </a>
              </li>
              <li class="breadcrumb-item">
                П-302-0
              </li>
              <li class="breadcrumb-item">
                {{actualPack.name}}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
      
    <div>
      <VueSidebarMenuAkahon @selectPackParent="selectPackHandler"/>
    </div>

    <packManager :packs="allPacks.blocks" @selectPackParent="selectPackHandler" />
    
    <!-- <input
      @change.prevent="importJSON"
      style="margin-right: 15px"
      type="file"
    />
    <button @click.prevent="exportJSON">export</button> -->

    <div class="container-fluid" :key="reRenderKey">
      <div class="row " >
        
        
        <div class="col-auto col-sm-auto col-md-auto col-lg-auto col-xl-auto p-0">
          <div style="width: 85px;">
          </div>
        </div>
        <div class="col-9 col-sm-9 col-md-10 col-lg-11 col-xl-11 p-0" >
          <!-- <div class="hardware-view-page__canvas-wrp d-xl-none d-lg-block d-md-block d-xs-block d-block " :key="reRenderKey" style="zoom:90%  ">
            <hardwareCanvas
              v-for="pack in allPacks.blocks"
              :id = "'block' + pack.id"
              :key="pack.name"
              v-show="pack.name === actualPack.name"
              :hardwareComponents="pack.components"
              :bgImage="pack.background"
              :backgroundSettings="pack.backgroundSettings"
            />
          </div> -->
          
          <div id="mainBlock" class="hardware-view-page__canvas-wrp" :key="reRenderKey" :style="'zoom:' + this.zoom + '%;'">
            <hardwareCanvas
              :zoom = "zoom"
              v-for="pack in allPacks.blocks"
              :key="pack.name"
              :id = "'block' + pack.id"
              v-show="pack.name === actualPack.name"
              :hardwareComponents="pack.components"
              :bgImage="pack.background"
              :backgroundSettings="pack.backgroundSettings"

            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <textShowVue @inputText="inputTextHandler" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>



import P3306JSON from "./P302O/P302O.json";

import hardwareCanvas from "./P302O/hardwareCanvas.vue";
import packManager from "./P302O/packManager.vue";
//import menuForShow from "./P302O/menuForShow.vue";
import textShowVue from "./P302O/textShow.vue";
import VueSidebarMenuAkahon from "./P302O/sideBarMenu.vue";
  


export default {
  created(){
    //this.getFistZoom();
    window.addEventListener('resize', this.updateWidth);
    this.allPacks = P3306JSON;
    this.actualPack = P3306JSON.blocks[0];
  },
  mounted(){
    
    this.getFistZoom();
    var buttonItem = document.querySelectorAll('.menu-for-show__border'), index, button;
    for (index = 0; index < buttonItem.length; index++) {
      button = buttonItem[index];
      button.addEventListener('click', this.updateZoom);
    }
      //console.log(event.currentTarget.id);
    document.getElementById(this.imgId).click();
  },
  destroyed(){
    var buttonItem = document.querySelectorAll('.btnBlock'), index, button;
    for (index = 0; index < buttonItem.length; index++) {
      button = buttonItem[index];
      button.addEventListener('click', this.updateZoom);
    }
  },
  components: {
    VueSidebarMenuAkahon,
    hardwareCanvas,
    packManager,
    //menuForShow,
    textShowVue,
  },
  data() {
    return {
      actualPack: null,
      allPacks: null,
      packForShow: null,
      width: window.innerWidth,
      imgWidth: 0,
      imgId: 1,
      zoom: 80,
      firstZoom:0
    };
  },
  methods: {
    showMenu(){
            
      if(document.getElementById('menuForShow').style.transform == 'translateX(100%)'){
        document.getElementById('menuForShow').style.transform = 'translateX(0%)';
        document.getElementById('btnMenuForShow').style.transform = 'translateX(0%)';
        document.getElementById('btnMenuForShow').classList.add('menu-btn_active'); 
        document.getElementById('menuForShow').classList.remove('d-none');

      }
      else{
        console.log('else');
        document.getElementById('menuForShow').style.transform = 'translateX(100%)';
        document.getElementById('btnMenuForShow').style.transform = 'translateX(0%)';
        document.getElementById('btnMenuForShow').classList.remove('menu-btn_active');
        document.getElementById('menuForShow').classList.add('d-none');
      }
    },
    getFistZoom(){
      let firstZoom = 0;
      let imgWidth = 856;
      if(this.width > imgWidth){
        firstZoom = Math.floor((this.width - imgWidth - 100)/imgWidth * 100) + 100;
      }
      else if(this.width < imgWidth){
        firstZoom = Math.ceil((this.width - imgWidth - 100)/imgWidth * 100) + 100;
      }
      this.firstZoom = firstZoom;
      document.getElementById('mainBlock').style.zoom = this.firstZoom + '%';
      
    },
    updateZoom(){
      if(event.currentTarget.id){
        this.imgId = event.currentTarget.id;
      }
      
      this.imgWidth = document.getElementById('block' + this.imgId).children[0].style.width;
      this.imgWidth = this.imgWidth.substr(0,this.imgWidth.length - 2);
      
      this.imgWidth = parseInt(this.imgWidth);

      if(this.width > this.imgWidth){
        this.zoom = Math.floor((this.width - 100 - this.imgWidth)/this.imgWidth * 100) + 100;
      }
      else if(this.width < this.imgWidth){
        this.zoom = Math.ceil((this.width - 100 - this.imgWidth)/this.imgWidth * 100) + 100;
      }
      document.getElementById('mainBlock').style.zoom = this.zoom + '%';
    },
    updateWidth() {
      
      const $html = document.documentElement;
      const width = $html.clientWidth;
      console.log(width);
      this.width = width;
      this.updateZoom();
    },
    selectPackHandler(pack) {
      this.actualPack = pack;
      this.packForShow = pack.name;
    },
    inputTextHandler(text) {
      console.log(text);
    },
    exportJSON() {
      const jsonFile = new Blob([JSON.stringify(this.actualPack)]);
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(jsonFile);
      downloadLink.download = "demo.json";
      downloadLink.click();
    },
    async parseJsonFile(file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => resolve(JSON.parse(event.target.result));
        fileReader.onerror = (error) => reject(error);
        fileReader.readAsText(file);
      });
    },
    importJSON(event) {
      const file = event.target.files[0];

      this.parseJsonFile(file)
        .then((res) => {
          this.allPacks.blocks

          for (let i = 0; i < this.allPacks.blocks.length; i++) {
            if (this.allPacks.blocks[i].name === res.name) {
              this.allPacks.blocks[i].components = res.components;
            }
          }

          // TODO: добавит ререндер хардвер канваса
        })
        .catch((error) => {
          console.log(error);
        });

    },
  },

  // created() {
  //   window.addEventListener('resize', this.updateWidth);
  //   this.allPacks = P3306JSON;
  //   this.actualPack = P3306JSON.blocks[0];
  // },
};
</script>



<style lang="scss" scoped>


.svgHome{
  fill: black;
}

.svgHome:hover{
  fill: darkgrey;
}
.menu-btn {
  cursor: pointer;
  rotate: 180deg;
  display: block;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  position: relative;
}
.menu-btn span,
.menu-btn span::before,
.menu-btn span::after {
  position: absolute;
  top: 50%; margin-top: -1px;
  left: 50%; margin-left: -10px;
  width: 20px;
  height: 2px;
  background-color: #222;
}
.menu-btn span::before,
.menu-btn span::after {
  content: '';
  display: block;
  transition: 0.2s;
}
.menu-btn span::before {
  transform: translateY(-5px);
}
.menu-btn span::after {
  transform: translateY(5px);
}

.menu-btn_active span:before {
  transform: rotate(35deg);
  width: 10px;
  transform-origin: left bottom;
}
.menu-btn_active span:after {
  transform: rotate(-35deg);
  width: 10px;
  transform-origin: left top;
}

</style>    