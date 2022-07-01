import React from 'react';

import './NotFound.css';

function ErrorPage() {
    return (
        <div className='main_not_found'>
            <h1 className='error'>404</h1>
            <h2 className='message'>Pagina não encontrada.</h2>
        </div>

    );
}

export default ErrorPage;
