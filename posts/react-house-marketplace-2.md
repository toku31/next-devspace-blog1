---
title: "House Marketplace Project By React & Firebase -2-
"
date: 'September 19, 2022'
excerpt: 'ReactとFirebaseを用いて不動産物件を売買できるアプリをつくりました。メールアドレスやGoogleアカウントで認証して、Cloud FireStore(クラウドデータベース)にデータ保存できるようにしました。'
cover_image: '/images/posts/img4.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/women/12.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->
参考サイト：https://gist.github.com/bradtraversy/caab8ebd8ff4b6e947632887e0183761  
https://github.com/toku31/react-house-market  
npm start  
npm run server  
John Doe : john@gmail.com

#### Exploreページ(Home)
~~~javascript
import {Link} from 'react-router-dom'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'

function Explore() {
  return (
  <div className='explore'>
    <header>
      <p className='pageHeader'>Explore</p>
    </header>

    <main>
      {/* Slider */}

      <p className="exploreCategoryHeading">Categories</p>
      <div className="exploreCategories">
        <Link to='/category/rent'>
          <img src={rentCategoryImage} alt="rent" className='exploreCategoryImg'/>
          <p className="exploreCategoryName">Places for rent</p>
        </Link>
        <Link to='/category/sell'>
          <img src={sellCategoryImage} alt="sell" className='exploreCategoryImg'/>
          <p className="exploreCategoryName">Places for sale</p>
        </Link>
      </div>
    </main>
  </div>
  )
}
export default Explore
~~~

## 95 Fetch Listings from database
https://firebase.google.cn/docs/firestore/query-data/get-data?hl=ja

~~~javascript
 const querySnap = await getDocs(collection(db, "listings"))
   querySnap.forEach((doc) => {
     // doc.data() is never undefined for query doc snapshots
     console.log(doc.id, " => ", doc.data());
     });
~~~

## 96 Listing Item Component

金額の数値を３桁で区切る正規表現
~~~javascript
listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
~~~

~~~javascript
import {Link} from 'react-router-dom'
import {ReactComponent as DeleteIcon} from '../assets/svg/deleteIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'

function ListingItem(props) {
  const { listing, id, onDelete } = props
  // console.log(listing.discountedPrice)
  return (
    <li className="categoryListing">
      <Link to={`/category/&{listing.type}/${id}`} className='categoryListingLink'>
        <img src={listing.imageUrls[0]} alt={listing.name} className='categoryListingImg' />
        <div className="categoryListingDetails">
          <p className="categoryListingLocation">{listing.location}</p>
          <p className="categoryListingName">{listing.name}</p>
          <p className="categoryListingPrice">￥{listing.offer
            ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {listing.type === 'rent' && '/ 月'}
          </p>
          <div className="categoryListingInfoDiv">
            <img src={bedIcon} alt="bed" />
            <p className="categoryListingInfoTExt">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} 寝室`
                : '1 寝室' }
            </p>
            <img src={bathtubIcon} alt="bath" />
            <p className="categoryListingInfoTExt">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} 浴室`
                : '1 浴室' }
            </p>
          </div>
        </div>
      </Link>
      
      {onDelete && (
        <DeleteIcon 
          className='removeIcon' 
          fill='rbg(231, 76, 60)'
          onClick = {()=>{onDelete(listing.id, listing.name)}}   />
      )}
    </li>
  )
}

export default ListingItem
~~~

## 98 Create Listing Page
~~~javascript
import {useState, useEffect, useRef} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'

function CreateListing() {
const [geolocationEnabled, setGeolocationEnabled]=useState(false)
const [loading, setLoading] = useState(false)
const [formData, setFormData] = useState({
  type: 'rent',
  name: '',
  bedrooms: 1,
  bathrooms: 1,
  parking: false,
  furnished: false,
  address: '',
  offer: false,
  regularPrice:0,
  discountedPrice:0,
  images: {},
  latitide: 0,
  longitude: 0
})

  const auth = getAuth()
  const navigate = useNavigate()
  const isMounted = useRef(true)

  useEffect(() => {
    // 初回レンダリング時に実行される
    if(isMounted){
      onAuthStateChanged(auth, (user) => {

        if (user) {            // サインインのとき
          setFormData({...formData, userRef: user.uid})
        } else {
          navigate('/sign-in')
        }
      })
    }
    
    return () => {
      isMounted.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted])

  if (loading) {
    return <Spinner />
  }

  return (
    <div>CreateListing</div>
  )
}

export default CreateListing
~~~

React Hooks useRefでマウント時の処理を使い分ける
useRefの使い方
~~~javascript
import React, {
  useState, useEffect, useRef,
} from 'react';

export const useRefExample = () => {
const [stateA, setStateA] = useState(null);
const inputRef = useRef(false);

useEffect(() => {
  if(inputRef.current) { // inputRefの初期値はfalseなので初回レンダリング時には実行されない
    console.log('componentDidUpdate!');
  } else {
    console.log('componentDidMount!'); //初回レンダリング時のみこのelseブロックの中が実行される
    inputRef.current = true //inputRefの値がtrueに切り替わるため、2回目以降useEffectが実行されるとき(componentUpdate)はif文のブロックの中が実行される
  }
}, [stateA]) // 副作用はstateAに依存する

return (
  <input
    ref={inputRef}
    value={stateA}
    onChange={e => setStateA(e.target.stateA)}
  />
 );
}
~~~

Firebase 現在ログインしているユーザーを取得する
onAuthStateChangedの使い方
~~~javascript
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
~~~

~~~javascript
    const userRef = db.collection('users').doc('kpUVKKold2s0rMcDnPTx')
    const userDoc = await userRef.get()
~~~

~~~javascript

~~~
Google Map Api を取得する方法
https://reblo.jp/blog/management51/

## 100 Geocoding API
~~~javascript
create-react-app, react-script で作られた React application は内部で dotenv が使われていて、.env で設定した値には、process.env 経由でアクセスができる。
ただし値にはREACT_APP_ のプレフィックスが必要
~~~

~~~javascript
環境変数をたくさん（個人的な直感では3つ以上）使うなら素直にdotenvを使った方が良さそう
~~~

~~~javascript
create-react-appを使っていて、.envを使う際に、変数の先頭にREACT_APP_とつけないとundifinedになります。
~~~

## 101 Uplaoding Image to Firebase
https://firebase.google.com/docs/storage/web/upload-files?hl=ja

~~~javascript
import { getStorage, ref } from "firebase/storage";

// Create a root reference
const storage = getStorage();

// Create a reference to 'mountains.jpg'
const mountainsRef = ref(storage, 'mountains.jpg');

// Create a reference to 'images/mountains.jpg'
const mountainImagesRef = ref(storage, 'images/mountains.jpg');

// While the file names are the same, the references point to different files
mountainsRef.name === mountainImagesRef.name;           // true
mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 
~~~

ユニークのIDを生成する
~~~javascript
npm i uuid
~~~

~~~javascript
  // Store images in firebase 101
  const storeImage = async(image) => {
    return new Promise ((resolve, reject) => {
      const storage = getStorage()
      const fileName =`${auth.currentUser.uid}-${image.name}-${uuidv4()}`

      const storageRef = ref(storage, 'images/' + fileName)

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          reject(error)
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    })
  }

  const imgUrls = await Promise.all(
    [...images].map((image) => storeImage(image))
  ).catch(() => {
    setLoading(false)
    toast.error('Images not uploaded')
    return
  })

  console.log(imgUrls)
  setLoading(false)
}
~~~
互いに独立した複数の非同期処理は、 Promise.all で待つ
https://takamints.hatenablog.jp/entry/using-promise-all-to-await-promises

⇓のコードでは、 最初のAPIの結果を得てから次のリクエストを行います。つまり順次実行されるのですが、これってちょっと無駄なんです。
~~~javascript
async function sample() {
    const response1 = await fetch("http://path.to/rest/api1");
    const response2 = await fetch("http://path.to/rest/api2");
}
~~~

複数の独立した非同期処理を素早く実行する
~~~javascript
async function sample() {
    const [response1, response2] = await Promise.all([
        fetch("http://path.to/rest/api1"),
        fetch("http://path.to/rest/api2"),
    ]);
}
~~~
個々のAPI呼び出しが返すPromiseオブジェクトを、個別に awaitせず、配列に格納して Promise.all に与えています。 これによって、すべてのAPIリクエストを一気に行って、結果が出るまで待つ

~~~javascript
async function sample() {
    const apis = [
        "http://path.to/rest/api1",
        "http://path.to/rest/api2",
    ];
    const responses = await Promise.all(apis.map(api => fetch(api));
}
~~~
当初は非同期処理でなかったので Array.forEach で書いていたのだが、途中で非同期処理に変更されたような時に、Array.forEach を Array.map に置き換えることを忘れていたり、 Promise.all を await するのを忘れていたり。これが実行時にエラーにならないんです


~~~

~~~

~~~

~~~

~~~

~~~

~~~

~~~

~~~

~~~

~~~

~~~

~~~

~~~