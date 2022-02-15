<template lang="">
  <header :class="{ 'scrolled-nav': scrolledNav }">
    <nav>
      <div>
        <img id="nav-logo" src="/assets/navbarlogo.png" alt="" />
      </div>
      <ul v-show="!mobile" class="NavbarComponent">
        <li><routerLink class="link" to="/">My Projects</routerLink></li>
        <li>
          <routerLink class="link" to="/about">Create Project</routerLink>
        </li>
        <li><routerLink class="link" to="/login">Sign In </routerLink></li>
        <li>
          <routerLink class="link" to="/createaccount"
            >Dont have an account?</routerLink
          >
        </li>
        <li>
          <RouterLink to="/profile">
            <span v-if="$store.state.loggedInUser != null">{{
              $store.state.loggedInUser.userName
            }}</span>

            <img
              id="profile-pic"
              src="/assets/Frame 112.png"
              alt="Adam Agerling"
            />
          </RouterLink>
        </li>
      </ul>
      <div class="icon">
        <i
          @click="toggleMobileNav"
          v-show="mobile"
          class="far fa-bars"
          :class="{ 'icon-active': mobileNav }"
        />
      </div>
      <transition name="mobile-nav"
        ><ul v-show="mobileNav" class="dropdown-nav">
          <li @click="toggleMobileNav">
            <routerLink class="link" to="/">My Projects</routerLink>
          </li>
          <li @click="toggleMobileNav">
            <routerLink class="link" to="/about">Create Project</routerLink>
          </li>
          <li @click="toggleMobileNav">
            <routerLink class="link" to="/contact">Sign In </routerLink>
          </li>
          <li @click="toggleMobileNav">
            <routerLink class="link" to="/contact"
              >Dont have an account?</routerLink
            >
          </li>
          <li @click="toggleMobileNav">
            <RouterLink to="/contact">
              <span v-if="$store.state.loggedInUser != null">{{
                $store.state.loggedInUser.userName
              }}</span>
            </RouterLink>
          </li>
        </ul>
      </transition>
    </nav>
  </header>
  <!-- <nav>
    <div>
      <img id="nav-logo" src="/assets/navbarlogo.png" alt="" />
    </div>
    <ul>
      <li><RouterLink to="/">My Projects</RouterLink></li>
      <li><RouterLink to="/about">Create Project</RouterLink></li>
      <li><RouterLink to="/contact">Sign In </RouterLink></li>
      <li><RouterLink to="/contact">Dont have an account?</RouterLink></li>
      <li>
        <RouterLink to="/contact"
          ><span v-if="$store.state.loggedInUser != null">{{
            $store.state.loggedInUser.userName
          }}</span>
        </RouterLink>
      </li>
      <img id="profile-pic" src="/assets/Frame 112.png" alt="Adam Agerling" />
    </ul>
  </nav> -->
</template>
<script>
  export default {
    name: 'NavbarComponent',
    data() {
      return {
        scrolledNav: null,
        mobile: null,
        mobileNav: null,
        windowWidth: null
      }
    },
    created() {
      window.addEventListener('resize', this.checkScreen)
      this.checkScreen()
    },
    mounted() {
      window.addEventListener('scroll', this.updateScroll)
    },
    methods: {
      toggleMobileNav() {
        this.mobileNav = !this.mobileNav
      },

      updateScroll() {
        const scrollPosition = window.scrollY
        if (scrollPosition > 50) {
          this.scrolledNav = true
          return
        }
        this.scrolledNav = false
      },

      checkScreen() {
        this.windowWidth = window.innerWidth
        if (this.windowWidth <= 750) {
          this.mobile = true
          return
        }
        this.mobile = false
        this.mobileNav = false
        return
      }
    }
  }
</script>
<style lang="scss" scoped></style>
