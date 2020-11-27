import React from "react";
import Nav from '../components/Nav';
import NewPostContainer from '../components/NewPostContainer';
import axios from 'axios';
import { Button, Grid } from '@material-ui/core';
import Post from '../components/Post'

function Newsfeed(props) {

    const postsPerPage = 15;
    let arrayForHoldingPosts = [];

    const [allPosts, setAllPosts] = React.useState([]);
    const [postsToShow, setPostsToShow] = React.useState([]);
    const [next, setNext] = React.useState(15);
    
    React.useEffect(() => {
        axios.get('/api/posts')
        .then(res => {
            setAllPosts(res.data)
        })
        .catch(err => console.log(err));

        axios.get('/api/images/all')
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));

    }, [])

    React.useEffect(() => {
        loopWithSlice(0, postsPerPage);
    }, [allPosts])
    
    const loopWithSlice = (start, end) => {
        const slicedPosts = allPosts.slice(start, end);
        arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
        setPostsToShow(arrayForHoldingPosts);
        
    };

    function HandleLoadMorePosts() {
        loopWithSlice(0, next + postsPerPage);
        setNext(next + postsPerPage);
    }

    // React.useEffect(() => {
    //     console.log(allPosts.length, postsToShow.length)
    //     if (allPosts.length === postsToShow.length) {
    //         setLoadMore(null);
    //     }    
    // }, [postsToShow])

    let recentPosts = postsToShow ? (
        postsToShow.map(post => <Post userHandle={props.handle} post={post} key={post.id}/>)
    ) : "No Posts Yet!";
    
        
    return (
        <>
            <Grid 
                container 
                spacing={0}
                direction="row" 
                justify="center"
                alignItems="center"
            >
                <Grid item sm={12}  >  
                    <NewPostContainer 
                        images={props.images} 
                        imageName={props.imageName} 
                        handle={props.handle}
                    />
                </Grid>
            </Grid>

            <Grid 
                container 
                spacing={0}
                direction="row" 
                justify="center"
                alignItems="center"
            >
                <Grid item sm={12}>  
                    {recentPosts}
                </Grid>
            </Grid>
            <Grid 
                container 
                spacing={0}
                direction="row" 
                justify="center"
                alignItems="center"
            >
                <Grid item sm={12} style={{textAlign: "-webkit-center"}}>  
                    <Button style={{marginBottom: "120px", 
                        marginTop: "50px", 
                        color: "#3d4647", 
                        backgroundColor: "#c8c1c199"}}
                        onClick={HandleLoadMorePosts}
                    >
                        <strong>Load More Posts</strong>
                    </Button>
                </Grid>
            </Grid>

            <Grid 
                container 
                spacing={0}
                direction="row" 
                justify="center"
                alignItems="stretch"
            >
                <Grid item sm={6}>    
                    <Nav/>
                </Grid>
            </Grid>
        </>
    );
    
}

export default Newsfeed;