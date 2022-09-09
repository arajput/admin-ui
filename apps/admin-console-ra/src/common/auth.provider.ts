import axios from 'axios';

const OIDC_HOST = 'https://dev-shiksha.uniteframework.io';
const OIDC_REALM = 'sunbird-rc';
const TOKEN_URL = `${OIDC_HOST}/auth/realms/${OIDC_REALM}/protocol/openid-connect/token`;
const USER_INFO_URL = `${OIDC_HOST}/auth/realms/${OIDC_REALM}/protocol/openid-connect/userinfo`;

const fetchToken = (
    authUrl: string,
    username: string,
    password: string
  ): Promise<any> => {
    const params = new URLSearchParams()
    params.append('client_id', 'registry-frontend')
    params.append('username', username)
    params.append('password', password)
    params.append('grant_type', 'password')
  
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*'
      }
    }
  
    return axios.post(authUrl, params, config).catch((e) => e)
  }
  
  const fetchUserInfo = (
    userInfoEndpointUrl: string,
    token: string
  ): Promise<any> => {
    const params = new URLSearchParams()
    params.append('client_id', 'registry-frontend')
    params.append('password', token)
  
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + token
      }
    }
  
    return axios.get(userInfoEndpointUrl, config).catch((e) => e)
  }

const authProvider = {
    login: async ({ username, password } : any) => {
        const tokenResponse =  await fetchToken(
            TOKEN_URL,
            username,
            password
        );
        if (! (tokenResponse.status && tokenResponse.status === 200 && tokenResponse?.data)) {
            return Promise.reject();
        }
        const userInfoResponse = await fetchUserInfo(
            USER_INFO_URL,
            tokenResponse.data.access_token
        );
        if (
            userInfoResponse &&
            userInfoResponse.status === 200 &&
            userInfoResponse.data
          ) {
            localStorage.setItem(
              'user_info',
              JSON.stringify(userInfoResponse.data)
            )
            localStorage.setItem('username', userInfoResponse.data['given_name']);
            localStorage.setItem('token', tokenResponse.data.access_token);
        
        return Promise.resolve();
        } else  return Promise.reject();

    },
    logout: () => {
        localStorage.removeItem('username');
        return Promise.resolve();
    },
    checkAuth: () =>
        localStorage.getItem('token') ? Promise.resolve() : Promise.reject(),
    checkError:  (error: any) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    getIdentity: () =>{
        const username = localStorage.getItem('username');
        if(username != undefined){
            return Promise.resolve({
                id: username,
                fullName: username,
            })
        } else {
            return Promise.resolve({
                id: 'user',
                fullName: '',
            })
        }
    },
    getPermissions: () => Promise.resolve(''),
};


export default authProvider;