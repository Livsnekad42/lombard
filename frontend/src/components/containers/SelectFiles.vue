<template>
  <div class="container__upload">
    <label>
      <input type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/>
      <figure>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
          <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
        </svg>
      </figure>
      <div v-if="errorMessage == ''" class="_info">
        <small>Допустимые форматы файлов</small>
        <p>[{{extPatterns.join(', ')}}]</p>
      </div>
      <div v-if="errorMessage != ''" class="_info__error">
        <strong>Внимание!</strong>
        <p>{{ errorMessage }}</p>
      </div>
    </label>
    <div v-if="files.length > 0" class="_files-list">
      <div v-for="(file, index) in files" v-bind:key="index" class="file-listing">{{ file.name }} 
        <span class="remove-file" v-on:click="removeFile(index)">
          <svg version="1.1" x="0px" y="0px"
               viewBox="0 0 409.806 409.806" style="enable-background:new 0 0 409.806 409.806;" xml:space="preserve">
            <title>Удалить</title>
              <g>
                  <g>
                      <path d="M228.929,205.01L404.596,29.343c6.78-6.548,6.968-17.352,0.42-24.132c-6.548-6.78-17.352-6.968-24.132-0.42
                          c-0.142,0.137-0.282,0.277-0.42,0.42L204.796,180.878L29.129,5.21c-6.78-6.548-17.584-6.36-24.132,0.42
                          c-6.388,6.614-6.388,17.099,0,23.713L180.664,205.01L4.997,380.677c-6.663,6.664-6.663,17.468,0,24.132
                          c6.664,6.662,17.468,6.662,24.132,0l175.667-175.667l175.667,175.667c6.78,6.548,17.584,6.36,24.132-0.42
                          c6.387-6.614,6.387-17.099,0-23.712L228.929,205.01z"/>
                  </g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "SelectFiles",
    props: [
        "extPatterns"
    ],
    data(){
      return {
        files: [],
        errorMessage: ""
      }
    },
    created() {
    },
    methods: {
      addFiles(){
        this.$refs.files.click();
      },
      submitFiles(){
        this.$emit('files', this.files);
      },
      handleFilesUpload(){
        this.errorMessage = "";
        let uploadedFiles = this.$refs.files.files;
        const file = uploadedFiles[0];
        let search = false;
        let splittedFileName = file.name.split(".");
        for ( const _extPattern of this.extPatterns ) {
          if ( splittedFileName[splittedFileName.length - 1] === _extPattern ) {
            search = true;
            break;
          }
        }
        if ( this.files.length > 0 ) {
          this.errorBind("Допустимо загрузить только один файл!");
          return;
        }
        if ( !search ) {
          this.errorBind("Вы не можете загрузить файл этого формата!");
          return;
        }
        this.files.push( file );
        this.$emit('files', this.files);
      },
      removeFile( key ){
        this.files.splice( key, 1 );
        this.$emit('files', this.files);
      },
      errorBind(message) {
        this.errorMessage = message;
        setTimeout(() => {this.errorMessage = "";}, 3000);
      }
    }
  }
</script>
<style lang="scss">
  .container__upload {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #92c7ff;
    padding: 2.25rem 0.25rem;
    label {
      figure {
        width: 100px;
        height: 135px;
        background-color: #3e51d3;
        display: block;
        position: relative;
        padding: 30px;
        margin: 0 auto 10px;
        cursor: pointer;
        &::before {
          border-top: 20px solid #dfc8ca;
          border-left: 20px solid transparent;
        }
        &::before, &::after {
          width: 0;
          height: 0;
          content: '';
          position: absolute;
          top: 0;
          right: 0;
        }
        svg {
          width: 100%;
          height: 100%;
          fill: #fff;
        }
      }
    }
  }
  input[type="file"]{
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  div.file-listing{
    width: 100%;
    display: flex;
    justify-content: center;
  }
  span.remove-file{
    svg {
      width: 15px;
      fill: #505050;
      padding: 0 0 2px 5px;
      cursor: pointer;
    }
  }
  ._info__error, ._info {
    text-align: center;
  }
  ._info {
    color: #676767;
    p {

    }
    small {

    }
  }
  ._info__error {
    color: #b21f2d;
  }
</style>