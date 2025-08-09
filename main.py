import ply.lex as lex
from ply import yacc

tokens = (
    'INT',
    'BOOL',
    'FLOAT',
    'STR',
    'UUID',

    'ARROW',

    'NAME',

    'L_BRACKET',
    'R_BRACKET',

    'QUOTE',
    'COLON',

    'COMMA',
    'PIPE'

)

t_ARROW = r'->'
t_L_BRACKET = r'{'
t_R_BRACKET = r'}'
t_QUOTE = r'"'
t_COLON = r':'
t_COMMA = r','
t_PIPE = r'\|'

def t_INT(t):
    r'int'
    return t

def t_BOOL(t):
    r'bool'
    return t

def t_FLOAT(t):
    r'float'
    return t

def t_STR(t):
    r'str'
    return t

def t_UUID(t):
    r'UUID'
    return t

def t_NAME(t):
    r'[A-Za-z_\d]+'
    t.value = str(t.value)
    return t


# Define a rule so we can track line numbers
def t_newline(t):
    r'\n+'
    t.lexer.lineno += len(t.value)

# A string containing ignored characters (spaces and tabs)
t_ignore  = ' \t'

def t_error(t):
    print("Illegal character '%s'" % t.value[0])
    t.lexer.skip(1)

lexer = lex.lex()

def p_doodle(t):
    '''doodle : typedef
            | doodle typedef

    '''
    return t



def p_typedef(t):
    '''typedef : NAME ARROW type_expr
    '''
    print(f'{t[1]} is of type {t[3]}')
    return t


def p_schema_expr(t):
    '''schema_expr : L_BRACKET inner_schema_expr R_BRACKET
    '''
    t[0] = f'schema[{t[2]}]'
    return t

def p_type_expr(t):
    '''type_expr : primitive
                 | NAME
                 | schema_expr
                 | union_expr
    '''
    t[0] = t[1]
    return t

def p_union_expr(t):
    '''union_expr : NAME PIPE NAME
    '''
    t[0] = f'union[{t[1]}, {t[3]}]'
    return t


def p_inner_schema_expr(t):
    '''inner_schema_expr : keyval_list
    '''
    t[0] = 'inner_schema'
    return t

def p_keyval_list(t):
    '''keyval_list : keyval
                   | keyval_list COMMA keyval
    '''
    t[0] = 'keyval_list'
    return t

def p_keyval(t):
    '''keyval : QUOTE NAME QUOTE COLON type_expr
    '''
    t[0] = 'keyval'
    return t

def p_primitive(t):
    '''primitive : INT
                | BOOL
                | FLOAT
                | STR
                | UUID
    '''

    t[0] = t[1]
    return t


with open('test.jd') as f:
    data = f.read()

parser = yacc.yacc()
result = parser.parse(data)
print(result)
