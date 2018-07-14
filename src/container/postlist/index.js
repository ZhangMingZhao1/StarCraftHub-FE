import Post from '../../component/post'

class Postlist extends React.Component {
  constructor() {
    super();
    this.state={
      postlist:[]
    }
  }

  componentWillMount() {
    fetch("localhost:3000/getPostList",{method:'GET'})
      .then( (res)=>res.json() )
      .then( (data)=> { 
        console.log(data);
        this.setState({postlist:data});
      })
  }

  render() {
    return (
      <div>
        {this.state.postlist.map(
          (v,k) => {
             return <div></div> 
          }
        )}

      </div>
    )
  }

}

export default Postlist;