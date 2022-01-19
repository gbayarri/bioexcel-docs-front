<template>
  <div class="main container">
    <h1>{{ header }}</h1>
    <Panel class="shadow-2 mb-3" id="header-welcome">
      <template #header>
        <i class="fas fa-info-circle"></i>
        <div class="p-panel-title">{{ welcomePanel.header }}</div>
      </template>
      <div class="grid">
        <div class="lg-10 md-8 sm-12">
          <div v-html="welcomePanel.description"></div>
          <ul>
            <li><router-link to="/docs/uc3">UC3 documents</router-link></li>
            <li><router-link to="/docs/wp2">WP2 Deliverables</router-link></li>
            <li><router-link to="/docs/biobb">BioBB documents</router-link></li>
          </ul>
        </div>
      </div>
    </Panel>

    <Panel class="shadow-2 mb-3" id="header-about">
      <template #header>
        <i class="fas fa-user-friends"></i>
        <div class="p-panel-title">{{ aboutPanel.header }}</div>
      </template>
      <div v-html="aboutPanel.description"></div>
    </Panel>

    <Card class="shadow-2 mb-6" id="card-footer">
      <template #content>
        <div class="grid">
          <div class="lg:col-3 md:col-6 sm:col-12">
            <div class="box">
              <a href="https://bioexcel.eu" target="_blank"
                ><img
                  alt="Bioexcel logo"
                  class="logo-90"
                  src="@/assets/img/logos/bioexcel.png"
              /></a>
            </div>
          </div>
          <div class="lg:col-3 md:col-6 sm:col-12">
            <div class="box">
              <a href="https://irbbarcelona.org" target="_blank"
                ><img
                  alt="IRB logo"
                  class="logo-100"
                  src="@/assets/img/logos/irb.png"
              /></a>
            </div>
          </div>
          <div class="lg:col-3 md:col-6 sm:col-12">
            <div class="box">
              <a href="https://bsc.es/" target="_blank"
                ><img alt="BSC logo" class="logo-90" src="@/assets/img/logos/bsc.png"
              /></a>
            </div>
          </div>
          <div class="lg:col-3 md:col-6 sm:col-12">
            <div class="box">
              <a href="https://www.nostrumbiodiscovery.com/" target="_blank"
                ><img
                  alt="NBD logo"
                  class="logo-100"
                  src="@/assets/img/logos/nbd.png"
              /></a>
            </div>
          </div>
        </div>
        <div class="grid margin-top-20">
          <div class="lg:col-3 md:col-6 sm:col-12">
            <div class="box">
              <a href="https://www.manchester.ac.uk/" target="_blank"
                ><img
                  alt="University of Manchester logo"
                  class="logo-100"
                  src="@/assets/img/logos/manchester.jpg"
              /></a>
            </div>
          </div>
          <div class="lg:col-3 md:col-6 sm:col-12">
            <div class="box">
              <a href="https://www.ebi.ac.uk/" target="_blank"
                ><img
                  alt="EMBL-EBI logo"
                  class="logo-90"
                  src="@/assets/img/logos/ebi.png"
              /></a>
            </div>
          </div>
          <div class="lg:col-3 md:col-6 sm:col-12">
            <div class="box">
              <a href="https://www.uu.nl/en" target="_blank"
                ><img
                  alt="University of Utrecht logo"
                  class="logo-90"
                  src="@/assets/img/logos/uu.png"
              /></a>
            </div>
          </div>
          <div class="lg:col-3 md:col-6 sm:col-12">
            <div class="box">
              <a href="https://www.kth.se/en" target="_blank"
                ><img
                  alt="KTH University logo"
                  class="logo-100"
                  src="@/assets/img/logos/kth.png"
              /></a>
            </div>
          </div>
        </div>
      </template>
    </Card>
    <ScrollTop :threshold="200" />
  </div>
</template>

<script>
//import { ref, onMounted } from 'vue'
import globals from "@/globals";
import { inject } from "vue";
export default {
  components: {},
  setup() {
    const $router = inject("$router");

    const header = globals.longName;

    const welcomePanel = {
      header: "Welcome to " + globals.longName,
      description: `
        <p><strong>${globals.longName}</strong> is a website created to gather together all generated <strong>documents</strong> and <strong>drafts</strong> 
        for the <strong>Work Package 2</strong> team (<em>Convergence of HPC/HPDA and Improved Usability</em>) within the <a href="https://bioexcel.eu" target="_blank">BioExcel CoE</a>. 
        It is a landing page with links to important documents written within the WP2, such as all <strong>Deliverables</strong> 
        summarising the work done during the BioExcel2 period, all scientific papers and drafts written within 
        the <strong>BioExcel2 Use Case 3</strong> context (<em>Rational Drug Design</em>), and all technical papers and drafts written 
        within the <a href="https://mmb.irbbarcelona.org/biobb" target="_blank">BioExcel Building Blocks library</a> and workflows project. </p>
      `,
    };

    const openLink = (id) => {
      $router.push({ name: id });
    };

    const aboutPanel = {
      header: " About us",
      description: `<p><strong>BioExcel2 WP2 team</strong> is led by <a href="https://www.irbbarcelona.org/en" target="_blank">IRB Barcelona</a> and helped by 
      <a href="https://bsc.es/" target="_blank">BSC</a>, <a href="https://www.nostrumbiodiscovery.com/" target="_blank">NBD</a>, <a href="https://www.manchester.ac.uk/" target="_blank">UNIMAN</a>, 
      <a href="https://www.ebi.ac.uk/" target="_blank">EMBL-EBI</a>, <a href="https://www.uu.nl/en" target="_blank">UU</a> and <a href="https://www.kth.se/en" target="_blank">KTH</a>.</p>`,
    };

    return { header, welcomePanel, openLink, aboutPanel };
  },
};
</script>

<style>
#about-logo p {
  text-align: center;
}
#about-logo p img {
  width: 80%;
}
.projects-time {
  color: #717171;
  font-size: 13px;
}
</style>
