<template>
  <div>
    <div v-if="loading" :class="$style.loading">
      <img
        src="~/assets/svg/tail-spin.svg?inline"
        height="50px"
        width="50px"
        alt
      />
    </div>
    <div :class="$style.grid">
      <div :class="$style.art">
        <nuxt-link to="/">
          <logo :class="$style.art_logo" />
        </nuxt-link>
        <div :class="$style.art_image"></div>
      </div>
      <div :class="$style.login">
        <div :class="$style.login_container">
          <div :class="$style.login_buttons">
            <h1>ログイン</h1>
            <p>ログインしてみましょう！</p>
            <div :class="$style.login_buttons_grid">
              <button
                :class="`${$style.button} ${$style.button_google}`"
                @click="googleLogin()"
              >
                <img
                  src="~/assets/svg/icons8-google.svg?inline"
                  height="30px"
                  width="30px"
                  alt
                />
                Googleでログイン
              </button>
            </div>
          </div>
          <div :class="$style.login_buttons">
            <h1>登録</h1>

            <div :class="$style.login_buttons_grid">
              <button
                :class="[$style.button, $style.button_signin_google]"
                @click="googleLogin()"
              >
                <img
                  src="~/assets/svg/icons8-google-white.svg?inline"
                  height="30px"
                  width="30px"
                  alt
                />
                Googleではじめる
              </button>
            </div>
            <p :class="$style.bottom">
              ログインすると同時に
              <a
                target="_blank"
                href="https://www.notion.so/teamkun/6c834ff61ec645b89fe87898352aeb7c"
                >当サービスの利用規約</a
              >に同意します
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style module lang="scss">
.loading {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba($color: #000000, $alpha: 0.5);
  backdrop-filter: blur(5px);
}
.grid {
  display: grid;
  grid-template-columns: 450px 1fr;
  height: 100vh;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    height: inherit;
  }
}
.art {
  position: relative;
  background-color: #4c7b57;
  @media (max-width: 1100px) {
    height: 60px;
  }
  &_logo {
    z-index: 2;
    position: absolute;
    top: 15px;
    left: 15px;
    height: 30px;
  }
  &_image {
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100vh;
    background-repeat: no-repeat no-repeat;
    background-position: bottom;
    background-size: contain;
    background-image: url('~assets/images/mirage-come-back-later.png');
    @media (max-width: 1100px) {
      display: none;
    }
  }
}
.login {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1100px) {
    height: calc(100vh - 60px);
  }
  &_container {
    width: 500px;
    @media (max-width: 1100px) {
      max-width: 300px;
    }
  }
  &_comment {
    &_left {
      font-size: 0.8rem;
      opacity: 0.5;
      position: absolute;
      bottom: 30px;
      left: 30px;
    }
  }
  &_buttons {
    display: block;
    padding-top: 30px;
    padding-bottom: 40px;
    margin-bottom: 20px;
    width: 100%;
    max-width: 500px;
    h1 {
      font-size: 1.5rem;
      margin-bottom: 10px;
      color: #4c7b57;
    }
    p {
      font-size: 0.8rem;
      opacity: 0.4;
      margin-bottom: 26px;
    }
    .bottom {
      margin-top: 15px;
      margin-bottom: 0;
      text-align: center;
    }
    &:nth-of-type(2) {
      min-width: calc(100% + 40px);
      transform: translateX(-20px);
      padding-left: 20px;
      padding-right: 20px;
      padding-top: 30px;
      background-color: rgba($color: #4c7b57, $alpha: 0.1);
      border-radius: 10px;
      h1 {
        font-size: 1.5rem;
        margin-bottom: 26px;
      }
    }
    &_grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      @media (max-width: 1100px) {
        grid-template-columns: 1fr;
      }
    }
  }
}
.button {
  color: white;
  background-color: #4285f4;
  width: 100%;
  display: inline-block;
  cursor: pointer;
  border: none;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  line-height: 20px;
  height: 40px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
  border-radius: 8px;

  align-items: center;
  display: flex;
  justify-content: center;
  img {
    margin-right: 10px;
  }
  &_google {
    color: #4285f4;
    background-color: rgba($color: #4285f4, $alpha: 0.1);
    border: solid 1px #4285f4;
  }
  &_twitter {
    color: #03a9f4;
    background-color: rgba($color: #03a9f4, $alpha: 0.1);
    border: solid 1px #03a9f4;
  }

  &_signin {
    &_twitter {
      background-color: #03a9f4;
    }
  }
}
</style>
<script lang="ts">
import Vue from 'vue'
import { authsStore } from '~/store'
import Swal from 'sweetalert2'
export default Vue.extend({
  layout: 'nonavbar',
  components: {
    logo: () => import('~/assets/svg/logo-login.svg'),
  },
  data() {
    return {
      loading: true,
    }
  },
  async mounted() {
    this.$fire.auth.onAuthStateChanged(async (user) => {
      authsStore.setUser(user)
      if (user)
        await this.$router.push('/dashboard')
    })

    try {
      const result = await this.$fire.auth.getRedirectResult()

      const user = result.user
      if (user) {
        const doc = await this.$fire.firestore
          .collection('users')
          .where('uid', '==', user.uid)
          .get()

        this.$fire.analytics.setUserId(user.uid)
        if (result.credential) {
          const event: string = doc.empty ? 'sign_up' : 'login'
          this.$fire.analytics.logEvent(event, {
            method: result.credential.providerId,
          })
        }
        if (doc.empty) {
          const userData = {
            uid: user.uid,
            photoURL: user.photoURL,
          }
          await this.$fire.firestore
            .collection('users')
            .doc(user.uid)
            .set(userData)
        }
      }
    } catch (err) {
      console.log('Error getting documents', err)
      if (err.code === 'auths/account-exists-with-different-credential') {
        await Swal.fire({
          icon: 'error',
          title: 'ログインできませんでした',
          text:
            'このメールアドレスはすでに使用されています。アカウントをリンクしたい場合には、ダッシュボードから行ってください。',
          confirmButtonColor: '#4c7b57',
          confirmButtonText: 'OK',
        })
      }
    } finally {
      this.loading = false
    }
  },
  methods: {
    googleLogin() {
      const provider = new this.$fireModule.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/yt-analytics.readonly');
      this.$fire.auth.signInWithRedirect(provider)
    },
  },
})
</script>
