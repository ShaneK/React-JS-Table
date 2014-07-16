/**
 * @jsx React.DOM
 */

var headers = ["Name", "Address", "Something Else"];

var rows = [
    {"Name": "Name1", "Address": "101 Fake St", "Something Else": "Something"},
    {"Name": "Name2", "Address": "111 Fake St", "Something Else": "Something Else"},
    {"Name": "Name3", "Address": "352 Fake St", "Something Else": "Something Else 2"}
];

var Table = React.createClass({
    getInitialState: function() {
        return {rows: this.props.rows, headers: this.props.headers};
    },
    addNewRow: function(){
        this.state.rows.push({});
        this.setState({rows: this.state.rows});
        return false;
    },
    render: function(){
        return (
            <div>
                <input type="submit" onClick={this.addNewRow} value="Add New Row" />
                <table>
                    <TableHeader headers={this.state.headers} />
                    <TableBody rows={this.state.rows} headers={this.state.headers} />
                </table>
            </div>
            );
    }
});

var TableHeader = React.createClass({
    render: function(){
        var headers = [];
        for(var i = 0, ii = this.props.headers.length; i < ii; i++){
            headers.push(
                <th key={"header_"+i}>{this.props.headers[i]}</th>
            );
        }
        headers.push(
            <th key="actions">Actions</th>
        );
        return (
            <thead>
                <tr>
                    {headers}
                </tr>
            </thead>
            );
    }
});

var TableBody = React.createClass({
    getInitialState: function(){
        return {rows: this.props.rows, headers: this.props.headers};
    },
    deleteRow: function(index){
        this.state.rows.splice(index,1);
        this.setState({rows: this.state.rows});
        return false;
    },
    render: function(){
        var _self = this;
        var rows = [];
        for(var i = 0, ii = _self.state.rows.length; i < ii; i++){
            rows.push(
                <TableRow key={"row_"+i} row={_self.state.rows[i]} headers={_self.state.headers} index={i} deleteRow={_self.deleteRow} />
            );
        }
        return (
            <tbody>
                {rows}
            </tbody>
            );
    }
});

var TableRow = React.createClass({
    render: function(){
        var _self = this;
        var rows = [];
        for(var i = 0, ii = this.props.headers.length; i < ii; i++){
            if(!_self.props.row['id']) _self.props.row['id'] = Math.random()*100;
            rows.push(
                <td key={"key_"+i+"_"+_self.props.row['id']}><TableDataInput rows={_self.props.row} header={_self.props.headers[i]} /></td>
            );
        }
        rows.push(
            <td key="deleteButton"><TableRowDeleteButton index={this.props.index} deleteRow={this.props.deleteRow} /></td>
        );
        return (
            <tr>
                {rows}
            </tr>
            );
    }
});

var TableDataInput = React.createClass({
    getInitialState: function() {
        return {data: this.props.rows[this.props.header]};
    },
    handleChange: function(event) {
        this.props.rows[this.props.header] = event.target.value;
        this.setState({data: event.target.value});
    },
    style: {
        width: "100%"
    },
    render: function(){
        return <input type='text' value={this.state.data} onChange={this.handleChange} style={this.style} />;
    }
});

var TableRowDeleteButton = React.createClass({
    handleDelete: function(){
        this.props.deleteRow(this.props.index);
    },
    render: function(){
        return <input type='submit' onClick={this.handleDelete} value="Delete" />
    }
});

React.renderComponent(
    <Table rows={rows} headers={headers} />,
    document.getElementById("content")
);