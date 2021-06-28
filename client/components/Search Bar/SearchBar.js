import React, { Component } from "react";
import PropTypes from 'prop-types';


export default class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            ...props,
            history:['Cats', 'Dogs', 'Whatever...'],
            category:"All Categories"
        }
    }

    getData(){
        return
        fetch( '/api/history' )
            .then((response) => response.json())
            .then((data) => {
                console.log("DATA: ", data)
                this.setState({history:data})
            } );
    }

    componentDidMount(){
        this.getData();
    }

    updateCategory(e){
        console.log("Submitted: ", e.target.value)
        this.setState({category:e.target.value})
    }
    submitSearch(e){
        this.setState({ass:true})
    }

    render(){
        const options = ["All Categories", "Electronics", "Furniture", "Whatever"]
        return (
            <div className={'search_container'} >
                <form className={"search_form"} onSubmit={this.submitSearch.bind(this) }>
                    <label htmlFor="search_box" className={"input_fields"}>
                        <input  className='input_box' list="history_options" type="search" id="search_box" name="search_box" placeholder="Search for anything" autoComplete="true" size="30" minLength="1" required/>
                        <datalist id="history_options">
                            {console.log("History: ", this.state.history)}
                            {this.state.history.map( searched => <option key={searched}> {searched} </option> ) }
                        </datalist>
                    </label>
                    <label className={"input_fields"}>
                        <select className='input_box' name={"Category"} value={this.state.category} onChange={ this.updateCategory.bind(this) }>
                            {options.map( cat => <option  key={cat}> {cat} </option> ) }
                        </select>
                    </label>

                    <input type="submit" value="Search" className="submit_action"   />
                </form>
            </div>
        )
    }
}


// export default LeaderBoard;
