<template>
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         width="200px" height="200px" viewBox="0 0 200 200" enable-background="new 0 0 200 200"
         xml:space="preserve">
<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="99.686" y1="59.255" x2="99.686" y2="59.255"/>
        <path fill="#FFFFFF" class="pathcook" stroke="#e5bf32" stroke-miterlimit="10" stroke-width="2.2%"
              d="M135.438,94.985
              c0.579,4.845,0.889,10.051,0.889,15.42
	          c0,25.553-7.011,47.095-15.677,47.095
	          c0,0-18.272,0-24.354,0c-6.095,0-24.368,0-24.368,0
	          c-8.652,0-15.663-21.542-15.663-47.095
	          c0-8.112,0.7-15.823,1.951-22.565
	          c-5.813-5.262-9.459-12.864-9.459-21.328
	          c0-15.877,12.877-28.755,28.755-28.755
	          c4.292,0,8.37,0.942,12.029,2.638
	          c4.077-3.445,9.352-5.517,15.111-5.517
	          c12.474,0,22.673,9.729,23.426,22.013
	          c10.711,0.283,19.323,9.069,19.323,19.861
	          C147.4,84.907,142.476,91.93,135.438,94.985z"/>


</svg>
</template>

<Script>
    export default {
        name: "animatedCheffLogo"
    }
</Script>

<style scoped>

    .pathcook {
        stroke-dasharray: 500;
        stroke-dashoffset: 500;
        animation: dash 3s linear alternate infinite;
    }

    @keyframes dash {
        to {
            stroke-dashoffset: 100;
        }

    }

</style>