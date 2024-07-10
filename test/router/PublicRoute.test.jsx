import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PublicRoute } from '../../src/router/PublicRoute';
import { AuthContext } from '../../src/auth';

describe('Pruebas en <PublicRoute />', () => {
    
    test('Debe de mostrar el children si no esta autenticado', () => {

        const contextValue = {
            logged: false
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Ruta pública</h1>
                </PublicRoute>
            </AuthContext.Provider>
        )

        // screen.debug();
        expect(screen.getByText('Ruta pública')).toBeTruthy();
    });

    test('Debe de navegar si esta autenticado', () => {
        
        const contextValue = {
            logged: true,
            user: {
                name: 'Pedro',
                id: 'ABC123'
            }
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/login']}>

                    <Routes>
                        <Route path='login' element={ 
                            <PublicRoute>
                                <h1>Ruta pública</h1>
                            </PublicRoute>
                        } />
                        <Route path='/' element={ <h1>Página Marvel</h1> } />
                    </Routes>

                    
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // screen.debug();

        expect( screen.getByText('Página Marvel') ).toBeTruthy();
    });
})