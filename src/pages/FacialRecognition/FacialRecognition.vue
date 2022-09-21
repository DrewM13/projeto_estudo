<template>
  <div class="column q-pa-md flex flex-center">
    <div class="col q-pa-md text-weight-medium">
      reconhecimento facial
    </div>
    <div class="col">
      <video autoplay id="cam" width="720" height="560"></video>
    </div>
  </div>


</template>
<script>
  import * as faceApi from 'face-api.js'
  export default{
created(){this.faceApi()},
methods:{
  FacialRecognition(){
    navigator.mediaDevices.enumerateDevices()
  .then(devices=>{
    devices.forEach(devices=>{
      if(devices.kind==='videoinput'){
        navigator.getUserMedia({video:{groupId:devices.groupId}}, stream=>cam.srcObject = stream, error=>console.log(error) )
      }
    }
      )
    })
  },
  async faceApi(){

Promise.all([
          faceApi.nets.tinyFaceDetector.loadFromUri('../../assets/lib/models/'),
          faceApi.nets.faceLandmark68Net.loadFromUri('../../assets/lib/models/'),
          faceApi.nets.faceRecognitionNet.loadFromUri('../../assets/lib/models/'),
          faceApi.nets.ssdMobilenetv1.loadFromUri('../../assets/lib/models')
          ])
          .then((res)=>{
            console.log(res);
            this.FacialRecognition()})
          .catch((error)=>{
            // console.log(error);
          })

      //  cam.addEventListener('play', async()=>{
      //  const canvas= faceApi.createCanvasFromMedia(cam)
      //  const canvasSize = {width: cam.width, height: cam.height}
      //  faceApi.matchDimensions(canvas,canvasSize)
      //  document.body.appendChild(canvas)
      // faceApi.detectAllFaces(cam, new faceApi.TinyFaceDetectorOptions())
      //  })
  }
}
}


</script>
