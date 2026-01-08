import React, { Component } from 'react'

export class Spinner extends Component {
    render() {
        return (
            <>
                <div class="text-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="sr-only"></span>
                    </div>
                </div>
            </>
        )
    }
}

export default Spinner